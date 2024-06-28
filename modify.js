
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
            
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const lines = content.split('\n');
            const modifiedLines = [];
            modifiedLines.push('Work Date, Employee,Job,Cost Type,Cost Code,,Hour Type,Trade, Level,Hours');
                for (let i = 0; i < lines.length; i++) {
                    let line = lines[i].trim();
                    if (!line) continue; // Skip empty lines
                    const parts = line.split(',');
                        
                    if(parts.length > 7){
                        parts.push();
                        [parts[8], parts[9]] = [parts[9], parts[8]];
                        if (parts[7].includes('O')) {
                            parts[8] = parts[7]
                            parts[7] = "Operator";
                        }
                        if (parts[7].includes('L')) {
                            parts[8] = "F1 - Laborer 1"
                            parts[7] = "Laborer";
                        }
                        if (parts[7].includes('C')) {
                            parts[8] = "CF1 - Concrete Finisher"
                            parts[7] = "Masonry";
                        }
                        if (parts[7].includes('D')) {
                            parts[8] = "F1 - Driver 1"
                            parts[7] = "Driver";
                        }
                        [parts[5],parts[6]] = [parts[6],parts[5]];
                        parts[3] = "L";
                    }   
                        
                    modifiedLines.push(parts.join(','));
                }

                let modifiedContent = modifiedLines.join('\n');

                const replacements = [
                    ["SHOP", "FIELD"],
                    ["VAC", "PTO"],
                    ["HOL", "Holiday"]];

                for (let i = 0; i < replacements.length; i++) {
                    let pattern = new RegExp(replacements[i][0], 'g');
                    //console.log(`Replacing ${replacements[i][0]} with ${replacements[i][1]}`); This is used to see in the debug console what is going on
                    modifiedContent = modifiedContent.replace(pattern, replacements[i][1]);
                    //console.log(modifiedContent);
                }
                    
            const blob = new Blob([modifiedContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
                    
            const downloadLink = document.getElementById('download-link');
            downloadLink.href = url;

            const currentDate = new Date(); //get current date
            const formattedDate = currentDate.toISOString().split('T')[0]; //gives date in YYYY-MM-DD Formate

            downloadLink.download = `modified_file_${formattedDate}.txt`; 
            downloadLink.style.display = 'block';
            downloadLink.innerText = 'Download Modified File';
        };
    reader.readAsText(file);
    } else {
        alert('Please upload a TXT file.');
    }
});
