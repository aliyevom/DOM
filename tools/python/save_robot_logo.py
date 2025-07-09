from PIL import Image
import os

def save_robot_logo():
    # Create qr_codes directory if it doesn't exist
    if not os.path.exists('qr_codes'):
        os.makedirs('qr_codes')
    
    # Create a new image with a white background
    size = (150, 150)
    img = Image.new('RGBA', size, (255, 255, 255, 0))
    
    # Draw the robot face
    robot_color = (79, 70, 229)  # Indigo color
    
    # Create circular head
    head = Image.new('RGBA', size, (0, 0, 0, 0))
    from PIL import ImageDraw
    draw = ImageDraw.Draw(head)
    draw.ellipse([20, 10, 130, 120], fill=robot_color)
    
    # Create eyes
    draw.ellipse([45, 40, 65, 60], fill=(255, 255, 255))  # Left eye
    draw.ellipse([85, 40, 105, 60], fill=(255, 255, 255))  # Right eye
    
    # Create smile
    draw.arc([55, 50, 95, 90], 0, 180, fill=(255, 255, 255), width=3)
    
    # Combine all parts
    img = Image.alpha_composite(img, head)
    
    # Save the image
    logo_path = 'qr_codes/robot_logo.png'
    img.save(logo_path)
    return logo_path

if __name__ == "__main__":
    save_robot_logo() 