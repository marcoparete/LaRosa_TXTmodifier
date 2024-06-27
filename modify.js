
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
            
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const modifiedContent = content.replace(/hi/g, 'HI');
                    
            const blob = new Blob([modifiedContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
                    
            const downloadLink = document.getElementById('download-link');
            downloadLink.href = url;
            downloadLink.download = 'newfile.txt';
            downloadLink.style.display = 'block';
            downloadLink.innerText = 'Download Modified File';
        };
    reader.readAsText(file);
    } else {
        alert('Please upload a TXT file.');
    }
});
