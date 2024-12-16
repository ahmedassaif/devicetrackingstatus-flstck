// src/utils/FileDownloadHelper.ts

export class FileDownloadHelper {
    static downloadExcelFile(response: any) {
        // Create a blob from the response
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);

        // Extract the file name from the Content-Disposition header
        const contentDisposition = response.headers['content-disposition'] || '';
        const fileName = contentDisposition
            .split(';')
            .find((n: string) => n.includes('filename='))
            ?.replace('filename=', '') || 'downloads.xlsx';

        // Create a link element and trigger a download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
