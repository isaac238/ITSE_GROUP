<script>
  import "iconify-icon";

  let type = "password";
  let icon = "mdi:eye-off-outline";

  const toggleType = (event) => {
    switch (type) {
      case "password":
        type = "text";
        icon = "mdi:eye-outline";
        break;
      case "text":
        type = "password";
        icon = "mdi:eye-off-outline";
        break;
      default:
        break;
    }
  };
</script>

<div class="container">
  <div class="register-form">
    <h2>Register</h2>
    <form method="POST">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <div id="password-container">
          <input {type} id="password" name="password" />
          <button id="toggle-button" type="button" on:click={toggleType}
            ><iconify-icon {icon} /></button
          >
        </div>
        <label for="confirm-password">Confirm Password</label>
        <div id="password-container">
          <input {type} id="confirm-password" name="confirm-password" />
          <button id="toggle-button" type="button" on:click={toggleType}
            ><iconify-icon {icon} /></button
          >
        </div>
      </div>
      <button class="submit-button" type="submit">Register</button>
    </form>
  </div>
</div>

<style>
  .container {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .register-form {
    min-width: 20rem;
    padding: 20px;
    border-radius: 5px;
    background-color: #857aff;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    background: white;
  }

  .submit-button {
    width: 100%;
    padding: 10px;
    background-color: #ffffff;
    color: #000000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .submit-button:active {
    transform: scale(1.04);

  }

  .submit-button:hover {
    background-color: #E67A8B;
    transition: .2s ease-in-out;
  }

  #toggle-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: transparent;
    border: none;
  }

  #password {
    border: none;
    background: transparent;
  }

  #password-container {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: white;
    margin-bottom: 1rem;
  }
</style>
