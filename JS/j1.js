var copy_code = "" ;
function f1() {
    document.getElementById("output").style.zIndex ="1";
    generateText();
}
async function generateText() {
        const prompt = document.getElementById("prompt").value +  "make a webpage with the internal css and dont provide any expanation just the code and with no extra word and use free images  if needed .And most important create the html code only . Can use  free images for logos  , fake entries , use diffrent images and names . And use fake names for the entries to make it look real .Make sure the webpage created will be responsive and elements should not overlap eachother making it look bad . And make sure the elements are flex as the size will increase or decrease as the elements inside them increase .Make sure the content displayed is centered . make sure to add the cloapse button when the size of screen is to small to show all items in the navigation bar and hide the button when the screen size is enough to display the  items .make sure the size of top navigation bar is 15vh";

        const apiKey = 'AIzaSyAsS89dwieirwi8QK19fxwbQqdHoNd8Wuc'; // Replace with your API key

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"contents":[{"parts":[{"text":`${prompt}`}]}]})
        });

        const data = await response.json();
        var code = data.candidates[0].content.parts[0].text  ;
        var clean_code = extractContentBetweenBackticks(code);
        clean_code = clean_code.substring(4 , clean_code.length) ;
        copy_code = clean_code ; // updating the code that can be copied
        let output  = document.getElementById("output") ;
        output.contentDocument.body.innerHTML  = clean_code ;

  }
  function extractContentBetweenBackticks(str) {
    const regex = /```([^```]+)```/s;
    const match = str.match(regex);

    if (match) {
      return match[1].trim(); // Return the content inside the backticks
    } else {
      return null; // No match found
    }
  }
  function copy(){
    navigator.clipboard.writeText(copy_code).then(() => {
        alert('Code copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy code: ', err);
      });
    }
