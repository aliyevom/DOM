#!/usr/bin/env python3
import os
import sys
import shutil
import subprocess

def run_build_and_deploy():
    try:
        print("Running pnpm build...")
        subprocess.run(["pnpm", "build"], check=True)
        print("Running firebase deploy...")
        subprocess.run(["firebase", "deploy", "--only", "hosting"], check=True)
        print("Build and deploy completed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"Error during build or deploy: {str(e)}")
        sys.exit(1)

def delete_out_file():
    # Get the current working directory
    current_dir = os.getcwd()
    out_path = os.path.join(current_dir, "out")
    try:
        if os.path.exists(out_path):
            if os.path.isfile(out_path):
                os.remove(out_path)
            elif os.path.isdir(out_path):
                shutil.rmtree(out_path)
            print(f"Successfully deleted {out_path}")
        else:
            print(f"{out_path} does not exist")
            
        # Ask for confirmation to proceed with build and deploy
        response = input("Do you want to proceed with build and deploy? (y/n): ").lower()
        if response == 'y':
            run_build_and_deploy()
        else:
            print("Build and deploy cancelled.")
            
    except Exception as e:
        print(f"Error deleting {out_path}: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    delete_out_file() 