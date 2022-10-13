const InitAPP = () => {
  // Get DOM Elements
  const passwordInput = document.querySelector('.input-box input'),
    passwordIndicator = document.querySelector('.pass-indicator'),
    copyIcon = document.querySelector('.input-box span'),
    lengthSlider = document.querySelector('.pass-length input'),
    options = document.querySelectorAll('.option input'),
    generateBtn = document.querySelector('.generate-btn');

  const characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '^!$%&|[](){}:;.,*+-#@<>~',
  };

  /*   -----   Functions   -----   */

  //   function - update slider

  const updateSlider = () => {
    document.querySelector('.pass-length span').innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
  };

  //   function - update password strength indicator

  const updatePassIndicator = () => {
    passwordIndicator.id =
      // if lengthSlider value is less than 8 characters then pass 'weak' as passIndicator id
      lengthSlider.value <= 8
        ? 'weak'
        : // else if f lengthSlider value is less than 16 then pass "medium"  as passIndicator id
        lengthSlider.value <= 16
        ? 'medium'
        : // else pass "strong" as id
          'strong';
  };

  //   function generate-password

  const generatePassword = () => {
    let staticPassword = '',
      randomPassword = '',
      excludeDuplicate = false,
      passLength = lengthSlider.value;

    // looping through each option's checkbox

    options.forEach((option) => {
      if (option.checked) {
        if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
          staticPassword += characters[option.id];
        } else if (option.id === 'spaces') {
          staticPassword += `  ${staticPassword}  `;
        } else {
          excludeDuplicate = true;
        }
      }
    });

    for (let i = 0; i < passLength; i++) {
      // getting random character from the static password

      let randomChar =
        staticPassword[Math.floor(Math.random() * staticPassword.length)];

      // if excludeDuplicate is true

      if (excludeDuplicate) {
        // if randomPassword doesn't contains the current random character or randomChar is equal to space " " then add random character to randomPassword else decrement i by -1

        !randomPassword.includes(randomChar) || randomChar == ' '
          ? (randomPassword += randomChar)
          : i--;
      } else {
        // else add random character to password

        randomPassword += randomChar;
      }
    }

    // pass generated password to display in input box
    passwordInput.value = randomPassword;
  };

  const copyPasword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = 'check';
    setTimeout(() => {
      copyIcon.innerText = 'copy_all';
    }, 1500);
    alert('Copied to clipboard');
  };

  //   Initiaing functions to elements

  copyIcon.addEventListener('click', copyPasword);
  lengthSlider.addEventListener('input', updateSlider);
  generateBtn.addEventListener('click', generatePassword);

  //   Initializing functions

  updateSlider();
  generatePassword();
};

document.addEventListener('DOMContentLoaded', InitAPP);
