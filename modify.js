
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
                        if (parts[6].includes('02-6020')){
                            parts[2] = "LBG EST";
                            parts[4] = "6020";
                        }
                        if (parts[6].includes('02-6000')){
                            parts[2] = "LBGOH";
                            parts[4] = "6000";
                        }
                        if (parts[6].includes('02-6095')){
                            parts[2] = "LBG BD";
                            parts[4] = "6095";
                        }
                        if (parts[6].includes('02-6098')){
                            parts[2] = "LBGSales";
                            parts[4] = "6098";
                        }
                        if (parts[6].includes('07-6298')){
                            parts[2] = "LEG SHOP";
                            parts[4] = "6298";
                        }
                        if (parts[6].includes('07-6020')){
                            parts[2] = "LEG EST";
                            parts[4] = "6020";
                        }
                        [parts[8], parts[9]] = [parts[9], parts[8]];
                        if (parts[7].includes('O')) {
                            if(parts[7].includes('2')){
                                parts[8] =  "OG2B - Excavator + 2CY";
                            }
                            if(parts[7].includes('3')){
                                parts[8] =  "OG3 - Dozer Finegrade";
                            }
                            if(parts[7].includes('6')){
                                parts[8] =  "OG6 - Loader 3-7CY/Dozer Rough";
                            }
                            if(parts[7].includes('8')){
                                parts[8] =  "OG8 - Mechanic";
                            }
                            if(parts[7].includes('9')){
                                parts[8] =  "OG9 - Loader 3-7CY/Skid Steer";
                            }
                            if(parts[7].includes('11')){
                                parts[8] =  "OG11 - Earth Roller";
                            }
                            parts[7] = "Operator";
                        }
                        if (parts[7].includes('L')) {
                            parts[8] = "F1 - Laborer 1";
                            parts[7] = "Laborer";
                        }
                        if (parts[7].includes('C')) {
                            parts[8] = "CF1 - Concrete Finisher";
                            parts[7] = "Masonry";
                        }
                        if (parts[7].includes('D')) {
                            parts[8] = "F1 - Driver 1";
                            parts[7] = "Driver";
                        }
                        if (parts[7].includes('M')) {
                            parts[8] = "F2 - Mechanic 1";
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
                    ["HOL", "Holiday"],
                    ["SALARY","SALARY TIME"],
                    ["BRANBR","E00036"],   
                    ["BRAVTR","E00052"], 
                    ["COLLGA","E00037"], 
                    ["CONEGU","E00034"],   
                    ["EDMOTY","E00040"],  
                    ["GILBDU","E00035"],  
                    ["GRANST","E00046"], 
                    ["HYNECH","E00032"],   
                    ["MARQCH","E00043"], 
                    ["MYERGR","E00041"],   
                    ["NICHPE","E00051"], 
                    ["PAREMA","E00053"],  
                    ["PERRJO","E00042"],  
                    ["PERRYAN","E00033"],  
                    ["RICHKY","E00038"], 
                    ["SANCOT","E00054"],  
                    ["VENDBR","E00044"],  
                    ["VINCST","E00048"], 
                    ["VRABMI","E00039"], 
                    ["WARRCO","E00055"],   
                    ["ANDEMI","E00004"],    
                    ["BARLMA","E00005"], 
                    ["BOURPE","E00023"],   
                    ["BRAGAN","E00024"],  
                    ["BRAVCH","E00022"], 
                    ["CECUAD","E00026"],   
                    ["CECUAN","E00028"],  
                    ["DOYOAL","E00008"], 
                    ["EDMOSU","E00009"], 
                    ["GAGNCH","E00014"],   
                    ["HARRKY","E00013"],  
                    ["LAROJA","E00003"], 
                    ["LAROPA","E00002"], 
                    ["LARORO","E00001"], 
                    ["LENGTI","E00010"],    
                    ["LOGOAN","E00027"],   
                    ["LORDJA","E00006"], 
                    ["MENDRE","E00050"], 
                    ["NATLKR","E00017"], 
                    ["PAREVI","E00011"],   
                    ["PEARDW","E00025"], 
                    ["PENTTI","E00007"], 
                    ["RAPULO","E00021"], 
                    ["SAMUDA","E00016"], 
                    ["SANTRO","E00018"],   
                    ["THOMSC","E00019"],  
                    ["TOMPRY","E00020"],   
                    ["TURLJO","E00029"], 
                    ["TYNEFR","E00015"],   
                    ["URYAJA","E00012"] 
                ];

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
