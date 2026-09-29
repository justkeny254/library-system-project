import os
import zipfile

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
IGNORE_DIRS = {'node_modules', '.git', 'dist'}
IGNORE_FILES = {'library_chapchap_project.zip', 'bun.lock'}

def create_single_code_file():
    output_md_path = os.path.join(PROJECT_ROOT, 'LIBRARY_CHAPCHAP_ALL_CODE.md')
    
    with open(output_md_path, 'w', encoding='utf-8') as out_f:
        out_f.write("# Library Chap Chap — Complete Project Source Code\n\n")
        out_f.write("> Consolidated single-file export of the Library Chap Chap secure library management application.\n")
        out_f.write("> Includes all TypeScript, React, Tailwind CSS, Express backend server, security utilities, and configuration files.\n\n")
        out_f.write("---\n\n")
        
        # Files to include in orderly priority
        file_list = []
        for root, dirs, files in os.walk(PROJECT_ROOT):
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            for file in sorted(files):
                if file in IGNORE_FILES or file.endswith('.md') and file == 'LIBRARY_CHAPCHAP_ALL_CODE.md':
                    continue
                # only text code files
                if file.endswith(('.ts', '.tsx', '.json', '.html', '.css', '.example', '.js', '.mjs')):
                    rel_path = os.path.relpath(os.path.join(root, file), PROJECT_ROOT)
                    file_list.append(rel_path)
                    
        file_list.sort()
        
        # Table of contents
        out_f.write("## Table of Contents\n\n")
        for fpath in file_list:
            out_f.write(f"- [`{fpath}`](#{fpath.replace('/', '').replace('.', '')})\n")
        out_f.write("\n---\n\n")
        
        # Dump content
        for fpath in file_list:
            full_path = os.path.join(PROJECT_ROOT, fpath)
            ext = os.path.splitext(fpath)[1].replace('.', '')
            lang = 'typescript' if ext in ('ts', 'tsx') else 'json' if ext == 'json' else 'html' if ext == 'html' else 'css' if ext == 'css' else ''
            
            out_f.write(f"## `{fpath}`\n\n")
            out_f.write(f"```{lang}\n")
            try:
                with open(full_path, 'r', encoding='utf-8', errors='ignore') as in_f:
                    out_f.write(in_f.read())
            except Exception as e:
                out_f.write(f"// Error reading file: {e}\n")
            out_f.write("\n```\n\n---\n\n")
            
    print(f"Successfully created single file: {output_md_path}")
    return output_md_path

def create_zip_archive():
    zip_path = os.path.join(PROJECT_ROOT, 'library_chapchap_project.zip')
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(PROJECT_ROOT):
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            for file in files:
                if file in IGNORE_FILES:
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, PROJECT_ROOT)
                zipf.write(full_path, rel_path)
                
    print(f"Successfully created zip archive: {zip_path}")
    return zip_path

if __name__ == '__main__':
    create_single_code_file()
    create_zip_archive()
