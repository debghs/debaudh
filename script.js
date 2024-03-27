const terminalOutput = document.querySelector('.terminal-output');
const commandInput = document.getElementById('command-input');
const terminalContent = document.querySelector('.content');

let commandHistory = []; // Store command history
let historyIndex = 0; // Keep track of the history index

terminalContent.addEventListener('click', () => {
  commandInput.focus();
});

commandInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const command = commandInput.value.trim();
    commandHistory.push(command); // Add command to history
    historyIndex = commandHistory.length; // Reset history index
    commandInput.value = '';
    document.getElementById('terminal-output').innerHTML += "<br>"; //  To maintain position of $ after command has been executed
    terminalOutput.innerHTML += `<p>$ ${command}</p>`;
    executeCommand(command);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  } else if (event.key === 'ArrowUp') {
    // Navigate command history backwards
    if (historyIndex > 0) {
      historyIndex--;
      commandInput.value = commandHistory[historyIndex];
    }
  } else if (event.key === 'ArrowDown') {
    // Navigate command history forwards
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      commandInput.value = commandHistory[historyIndex];
    } else {
      // Clear input when reaching the end of history
      historyIndex = commandHistory.length;
      commandInput.value = '';
    }
  }
});

function executeCommand(command) {
  if (command === 'help') {
    terminalOutput.innerHTML += `
      <p>Available Commands:</p>
      <p>-about</p>
      <p>-projects</p>
      <p>-contact</p>
      <p>-clear</p>
      <p>-help</p>
    `;
  } else if (command === 'about') {
    terminalOutput.innerHTML += `
      <p>About Me:</p>
      <p>I am a web developer passionate about creating awesome websites and applications.</p>
    `;
  } else if (command === 'projects') {
    terminalOutput.innerHTML += `
      <p>Projects:</p>
      <ul>
        <li>Project 1</li>
        <li>Project 2</li>
        <li>Project 3</li>
      </ul>
    `;
  } else if (command === 'contact') {
    terminalOutput.innerHTML += `
      <p>Contact Me:</p>
      <p>Email: example@example.com</p>
      <p>Phone: +1234567890</p>
    `;
    
  } else if (command === 'clear') {
    terminalOutput.innerHTML = `
    `;
  }  else {
    terminalOutput.innerHTML += `<p>${command}: command not found</p>`;
  }
}

// Function to simulate typing effect
function typeMessage(message, speed) {
    return new Promise(resolve => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < message.length) {
          document.getElementById('terminal-output').innerHTML += message.charAt(index);
          index++;
        } else {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  }
  
  // Initial messages to be typed out
  const initialMessages = [
    "Welcome to My Portfolio Terminal",
    "Type 'help' to see available commands"
  ];
  
  // Function to type out the initial messages
  async function typeInitialMessages(messages, speed) {
    for (const message of messages) {
      await typeMessage(message, speed);
      document.getElementById('terminal-output').innerHTML += "<br>"; // Add a line break after each message
      await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 0.2 second before typing the next message
    }
  }
  
  // Call the function to start typing the initial messages when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    typeInitialMessages(initialMessages, 50); // Adjust speed as needed (50 milliseconds in this case)
  });

  