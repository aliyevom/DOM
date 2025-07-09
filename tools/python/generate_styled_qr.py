import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer, CircleModuleDrawer
from qrcode.image.styles.colormasks import RadialGradiantColorMask, SolidFillColorMask, VerticalGradiantColorMask
from PIL import Image, ImageDraw, ImageFilter, ImageChops
import os
from datetime import datetime

def rgba_to_rgb(rgba_str):
    """Convert rgba string to RGB tuple"""
    # Extract numbers from rgba string
    import re
    numbers = re.findall(r'[\d.]+', rgba_str)
    if len(numbers) >= 3:
        return tuple(int(float(x) * 255) if float(x) <= 1 else int(float(x)) for x in numbers[:3])
    return (59, 130, 246)  # Default blue if parsing fails

def prepare_logo(input_path, output_size=(80, 80)):  # Reduced size for better clarity
    """Prepare the logo image with proper size and transparency"""
    # Open and resize the image
    logo = Image.open(input_path)
    logo = logo.convert('RGBA')
    
    # Calculate the new size maintaining aspect ratio
    aspect_ratio = logo.size[0] / logo.size[1]
    if aspect_ratio > 1:
        new_size = (output_size[0], int(output_size[1] / aspect_ratio))
    else:
        new_size = (int(output_size[0] * aspect_ratio), output_size[1])
    
    # Resize the image
    logo = logo.resize(new_size, Image.Resampling.LANCZOS)
    
    # Create a new image with the desired size and paste the logo in the center
    final_logo = Image.new('RGBA', output_size, (255, 255, 255, 0))
    paste_x = (output_size[0] - new_size[0]) // 2
    paste_y = (output_size[1] - new_size[1]) // 2
    final_logo.paste(logo, (paste_x, paste_y), logo)
    
    # Create white background mask slightly larger than the logo
    padding = 15  # Increased padding for better white space
    mask_size = (output_size[0] + padding * 2, output_size[1] + padding * 2)
    white_mask = Image.new('RGBA', mask_size, (255, 255, 255, 255))
    
    # Save both the logo and its mask
    output_path = os.path.join('qr_codes', 'processed_logo.png')
    mask_path = os.path.join('qr_codes', 'logo_mask.png')
    final_logo.save(output_path)
    white_mask.save(mask_path)
    return output_path, mask_path

def generate_styled_qr(url, logo_path=None, filename=None, style="rounded"):
    """
    Generate a styled QR code with optional logo
    
    Args:
        url (str): The URL to encode
        logo_path (str): Path to the logo image (optional)
        filename (str): Output filename (optional)
        style (str): Style of QR code ("rounded", "circle", "gradient")
    """
    if not os.path.exists('qr_codes'):
        os.makedirs('qr_codes')

    # Process the logo if provided
    logo_path_processed = None
    mask_path = None
    if logo_path:
        logo_path_processed, mask_path = prepare_logo(logo_path)

    # QR code settings
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=12,
        border=4
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Convert the gradient colors
    gradient_from = rgba_to_rgb("rgba(59, 130, 246, .9)")  # Blue
    gradient_to = rgba_to_rgb("rgba(79, 70, 229, .9)")    # Indigo

    # Style selection with new gradient
    module_drawer = RoundedModuleDrawer() if style != "circle" else CircleModuleDrawer()
    
    if style == "gradient":
        color_mask = RadialGradiantColorMask(
            back_color=(255, 255, 255),
            center_color=gradient_from,
            edge_color=gradient_to
        )
    else:
        color_mask = VerticalGradiantColorMask(
            back_color=(255, 255, 255),
            top_color=gradient_from,
            bottom_color=gradient_to
        )

    # Generate QR code image
    qr_image = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=module_drawer,
        color_mask=color_mask
    )

    # Convert to RGBA for manipulation
    qr_image = qr_image.convert('RGBA')
    
    # Create the final composition
    if logo_path_processed and mask_path:
        # Load the logo and its mask
        logo = Image.open(logo_path_processed)
        white_mask = Image.open(mask_path)
        
        # Calculate center position
        pos_x = (qr_image.size[0] - white_mask.size[0]) // 2
        pos_y = (qr_image.size[1] - white_mask.size[1]) // 2
        
        # Create a mask-sized white rectangle
        white_bg = Image.new('RGBA', white_mask.size, (255, 255, 255, 255))
        
        # Paste the white background and logo
        qr_image.paste(white_bg, (pos_x, pos_y), white_mask)
        
        # Calculate logo position to center it in the white space
        logo_pos_x = pos_x + (white_mask.size[0] - logo.size[0]) // 2
        logo_pos_y = pos_y + (white_mask.size[1] - logo.size[1]) // 2
        qr_image.paste(logo, (logo_pos_x, logo_pos_y), logo)
    
    # Apply subtle shadow effect
    shadow = Image.new('RGBA', qr_image.size, (0,0,0,0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rectangle([0, 0, qr_image.size[0], qr_image.size[1]], fill=(0,0,0,30))
    shadow = shadow.filter(ImageFilter.GaussianBlur(5))
    
    # Create white background
    background = Image.new('RGBA', qr_image.size, (255,255,255,255))
    
    # Combine layers
    final_image = Image.alpha_composite(background, shadow)
    final_image = Image.alpha_composite(final_image, qr_image)

    # Generate filename if not provided
    if not filename:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"styled_qr_{timestamp}.png"
    
    # Ensure filename has .png extension
    if not filename.endswith('.png'):
        filename += '.png'
    
    # Save the image
    file_path = os.path.join('qr_codes', filename)
    final_image.save(file_path, quality=95)
    
    # Clean up temporary files
    if logo_path_processed and os.path.exists(logo_path_processed):
        os.remove(logo_path_processed)
    if mask_path and os.path.exists(mask_path):
        os.remove(mask_path)
        
    return file_path

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python generate_styled_qr.py <url> [filename] [style]")
        print("Styles available: rounded, circle, gradient")
        sys.exit(1)
    
    url = sys.argv[1]
    filename = sys.argv[2] if len(sys.argv) > 2 else None
    style = sys.argv[3] if len(sys.argv) > 3 else "rounded"
    
    try:
        # Use the actual robot logo
        logo_path = 'robot-login.png'
        file_path = generate_styled_qr(url, logo_path, filename, style)
        print(f"Styled QR code generated successfully: {file_path}")
    except Exception as e:
        print(f"Error generating QR code: {e}")
        sys.exit(1) 