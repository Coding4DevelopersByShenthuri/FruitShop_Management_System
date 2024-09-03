import os

def list_files_and_folders(startpath):
    excluded_dirs = {'node_modules', '.git'}
    
    with open('folder_structure.md', 'w') as file:
        for root, dirs, files in os.walk(startpath):
            # Skip excluded directories
            dirs[:] = [d for d in dirs if d not in excluded_dirs]
            
            # Write the current directory
            level = root.replace(startpath, '').count(os.sep)
            indent = ' ' * 4 * (level)
            file.write(f'{indent}{os.path.basename(root)}/\n')
            
            # Write the files in the current directory
            for f in files:
                file.write(f'{indent}    {f}\n')

if __name__ == "__main__":
    path = input("Enter the path of the folder: ")
    if os.path.isdir(path):
        list_files_and_folders(path)
        print("Folder structure has been written to 'folder_structure.txt'.")
    else:
        print("The provided path is not a valid directory.")
