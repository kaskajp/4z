import os
import re

# Paths for header, footer, and the views and destination directories
header_path = '../src/includes/header.html'
footer_path = '../src/includes/footer.html'
views_dir = '../src/views/'
destination_dir = '../dist/'

# Read the content of the header and footer files with UTF-8 encoding
with open(header_path, 'r', encoding='utf-8') as file:
    header_template = file.read()

with open(footer_path, 'r', encoding='utf-8') as file:
    footer = file.read()

# Function to ensure destination subdirectory exists
def ensure_dir(file_path):
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)

# Iterate through each HTML file in the views folder and its subfolders
for subdir, dirs, files in os.walk(views_dir):
    for filename in files:
        if filename.endswith('.html'):
            file_path = os.path.join(subdir, filename)

            with open(file_path, 'r', encoding='utf-8') as file:
                main_content = file.read()

            # Check if the file is not index.html
            if filename != 'index.html':
                # Extract the first <h1> content
                match = re.search('<h1>(.*?)</h1>', main_content, re.IGNORECASE)
                if match:
                    page_title = match.group(1)
                    # Replace the title in the header
                    header = re.sub('<title>.*?</title>', f'<title>4z / {page_title}</title>', header_template)
                else:
                    header = header_template
            else:
                # Use the original header for index.html
                header = header_template

            # Combine the content
            combined_html = header + main_content + footer

            # Create corresponding subdirectory structure in the destination directory
            relative_subdir = os.path.relpath(subdir, views_dir)
            dest_subdir = os.path.join(destination_dir, relative_subdir)
            ensure_dir(dest_subdir + '/')

            # Write the combined content to a new HTML file in the corresponding subdirectory
            with open(os.path.join(dest_subdir, filename), 'w') as file:
                file.write(combined_html)
