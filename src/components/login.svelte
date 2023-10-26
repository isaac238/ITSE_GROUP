  <script>
	import 'iconify-icon';

	let type = "password";
	let icon = "mdi:eye-off-outline";

	const toggleType = (event) => {
		switch (type) {
			case "password":
				type = "text";
				icon = "mdi:eye-outline"
				break;
			case "text":
				type = "password";
				icon = "mdi:eye-off-outline"
				break;
			default: break;
		}
	};
  </script>
  <div class="login-form">
    <h2>Login</h2>
    <form method="POST">
      <div class="form-group">
        <label for="username">Username:</label>
       <input type="text" id="username" name="username"/>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
		<div id="password-container">
			<input {type} id="password" name="password"/>
			<button id="toggle-button" type="button" on:click={toggleType}><iconify-icon {icon} /></button>
		</div>
      </div>
      <button class="submit-button" type="submit">Login</button>
    </form>
  </div>


  <style>
    .login-form {
      max-width: 300px;
      margin: 10rem auto;
      padding: 20px;
      border-radius: 5px;
      background-color: #857AFF;
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
    }
  
    .submit-button:hover {
      background-color: rgb(3, 117, 238);
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
	}


  </style>
  
