#!/bin/bash

# Remove any existing error log
rm -f error.log

# Enable recursive globbing
shopt -s globstar

# Process files in parallel using xargs
find data -type f -name "*.json" | xargs -n 1 -P "$(nproc)" -I {} bash -c '
	file="{}"
	echo "Processing file: $file"
	jq --tab -j . <"$file" >"$file.out" 2>"$file.err"
	if [ $? -eq 0 ]; then
		mv "$file.out" "$file"
		rm "$file.err"
	else
		echo "$file.err" >> error.log
		rm "$file.out"
	fi
'

# Print any files that failed to process
if [ -f error.log ] && [ "$(cat error.log | wc -l)" -gt 0 ]; then
	echo "The following files failed to process:"
	cat error.log | sed 's/^/ - /'
else
	echo "All files processed successfully."
fi
