#!/usr/bin/env python
import os
import zipfile

def zipdir(path, zipf):
    # zipf is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            path = os.path.join(root, file)
            zipf.write(path, os.path.basename(path))

if __name__ == '__main__':
    zipf = zipfile.ZipFile('private/CopyPMID.zip', 'w', zipfile.ZIP_DEFLATED)
    zipf.write("README")
    zipf.write("LICENSE")
    zipdir('Copy PMID extension/', zipf)
    zipf.close()