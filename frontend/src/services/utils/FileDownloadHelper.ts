export class FileDownloadHelper {
    static downloadExcelFile(response: any) {
        // Create a blob from the response
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);

        // Extract the file name from the Content-Disposition header
        const contentDisposition = response.headers['content-disposition'] || '';
        let fileName = contentDisposition.split(';').find((n: string) => n.includes('filename='))?.split('filename=')[1].trim() || 'downloads.xlsx';

        // Remove any leading or trailing quotes
        if (fileName.startsWith('"') && fileName.endsWith('"')) {
            fileName = fileName.slice(1, -1);
        }

        // Remove leading and trailing underscores
        fileName = fileName.replace(/^_+|_+$/g, '');

        // Create a link element and trigger a download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
