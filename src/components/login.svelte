  <script>
	import 'iconify-icon';

	let type = "password";
	let icon = "mdi:eye-off-outline";

	const toggleType = (event) => {
		switch (type) {
			case "password":
				type = "text";
				icon = "mdi:eye-off-outline"
				break;
			case "text":
				type = "password";
				icon = "mdi:eye-outline"
				break;
			default: break;
		}
	};
  </script>
  <div class="login-form">
    <h2>Login</h2>
    <form>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username"/>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input {type} id="password"/>
		<button on:click={toggleType}><iconify-icon {icon} /></button>
      </div>
      <button class="submit-button" type="submit">Login</button>
    </form>
  </div>


  <style>
    .login-form {
      max-width: 300px;
      margin: 10rem auto;
      padding: 20px;
      border: 1px solid #0096EB;
      border-radius: 5px;
      background-color: #ffffff;
      color: black;
      filter: drop-shadow(5px 5px);
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
    }

  
    .submit-button {
      width: 100%;
      padding: 10px;
      background-color: #0096EB;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    .submit-button:hover {
      background-color: rgb(3, 117, 238);
    }
  </style>
  

  
