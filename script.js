// script.js
import commands from './commands.js';

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
    event.preventDefault(); // Prevent the default form submission behavior
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
    event.preventDefault(); // Prevent the cursor from moving in the input field
    if (historyIndex > 0) {
      historyIndex--;
      commandInput.value = commandHistory[historyIndex];
    }
  } else if (event.key === 'ArrowDown') {
    // Navigate command history forwards
    event.preventDefault(); // Prevent the cursor from moving in the input field
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
  if (commands.hasOwnProperty(command)) {
    if (command === 'clear') {
      terminalOutput.innerHTML = ''; // Clear terminal output
    } else {
      terminalOutput.innerHTML += commands[command];
    }
  } else {
    terminalOutput.innerHTML += `<p>command not found</p>`;
  }
  // Ensure command prompt is visible
  commandInput.scrollIntoView();
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
    "welcome to debaudh's terminal",
    "type 'help' to see available commands"
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
