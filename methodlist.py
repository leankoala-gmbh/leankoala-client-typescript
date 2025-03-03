import os
import re
from typing import List, Tuple
from datetime import datetime

def extract_route_info(file_content: str, file_name: str) -> List[Tuple[str, str, str]]:
    method_pattern = r"""async\s+(\w+)\([^)]*\)[^{]*{[^}]*?
        const\s+route\s*=\s*{\s*path:\s*['"]([^'"]*)['"]\s*,\s*method:\s*['"]([^'"]*)['"]\s*"""

    matches = re.finditer(method_pattern, file_content, re.VERBOSE | re.DOTALL)

    route_info = []
    for match in matches:
        method_name = match.group(1)
        path = match.group(2)
        http_method = match.group(3)
        route_info.append((path, http_method, method_name))

    if not route_info:
        alt_pattern = r"""async\s+(\w+)\([^)]*\)[^{]*{[^}]*?
            route\s*=\s*{\s*path:\s*['"]([^'"]*)['"]\s*,\s*method:\s*['"]([^'"]*)['"]\s*"""

        matches = re.finditer(alt_pattern, file_content, re.VERBOSE | re.DOTALL)

        for match in matches:
            method_name = match.group(1)
            path = match.group(2)
            http_method = match.group(3)
            route_info.append((path, http_method, method_name))

    if not route_info:
        comment_pattern = r"""async\s+(\w+)\([^)]*\)[^{]*{[^}]*?
            \*\s+request\s+url:\s*/kapi/v\d+/([^\n]*)[^}]*?
            \*\s+request\s+method:\s*([A-Z]+)\s*"""

        matches = re.finditer(comment_pattern, file_content, re.VERBOSE | re.DOTALL)

        for match in matches:
            method_name = match.group(1)
            path = match.group(2)
            http_method = match.group(3)
            route_info.append((path, http_method, method_name))

    return route_info

def process_repository_files(directory: str) -> List[str]:
    results = []
    print(f"Searching in directory: {os.path.abspath(directory)}")

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('Repository.ts'):
                file_path = os.path.join(root, file)
                print(f"Found repository file: {file_path}")
                repo_name = file.replace('Repository.ts', '').lower() + 'Repository'

                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    route_infos = extract_route_info(content, file)
                    print(f"Found routes in {file}: {len(route_infos)}")

                    for path, method, func_name in route_infos:
                        result = f"{path} [{method}] => {repo_name}.{func_name}()"
                        results.append(result)
                except Exception as e:
                    print(f"Error processing file {file_path}: {str(e)}")

    return sorted(results)

def main():
    repository_path = 'src/Repository/Entities'
    output_file = 'repository_routes.txt'

    try:
        results = process_repository_files(repository_path)

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f"Repository Routes (created at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')})\n")
            f.write("=" * 80 + "\n\n")

            for result in results:
                f.write(result + "\n")

        print(f"Results written to file: '{output_file}'")
        print(f"Total routes found: {len(results)}")

    except Exception as e:
        print(f"Error processing repositories: {str(e)}")

if __name__ == "__main__":
    main()
