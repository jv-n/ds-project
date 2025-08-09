# File Upload Testing Guide

The file upload system has been fixed to handle the "Unexpected Field" error. Here's how to test it properly:

## Issues Fixed:

1. **Field Name**: The server expects the file field to be named `'file'`
2. **Multer Configuration**: Updated to use memory storage for S3 upload
3. **Error Handling**: Added specific handling for multer errors
4. **Debug Route**: Added `/file/debug` endpoint for troubleshooting

## Testing with Insomnia/Postman:

### Debug Endpoint (Recommended first test)
- **URL**: `POST http://localhost:3001/file/debug`
- **Method**: POST
- **Body Type**: Form Data (multipart/form-data)
- **Field Name**: `file` (IMPORTANT: must be exactly "file")
- **Field Type**: File
- **Value**: Choose any file

### Upload Endpoint  
- **URL**: `POST http://localhost:3001/file/upload`
- **Method**: POST
- **Body Type**: Form Data (multipart/form-data)
- **Field Name**: `file` (IMPORTANT: must be exactly "file")
- **Field Type**: File
- **Value**: Choose any file

## Common Issues and Solutions:

1. **"Unexpected Field" Error**: 
   - Make sure the field name is exactly `'file'` (case-sensitive)
   - Don't use `'files'`, `'upload'`, `'document'`, or any other name

2. **"File too large" Error**:
   - File size limit is set to 10MB
   - Check that your file is smaller than this limit

3. **No file received**:
   - Make sure you're using `multipart/form-data` content type
   - Ensure the file field is properly selected in your API client

## Environment Variables Required:

Make sure these environment variables are set in your `.env` file:
```
S3_ENDPOINT=your-s3-endpoint
S3_BUCKET=your-bucket-name
S3_KEY=your-access-key
S3_SECRET=your-secret-key
```

## Console Logs:

The server will now log:
- Multer file processing information
- Upload attempt details
- Any errors that occur

Check the server console for detailed debugging information.
