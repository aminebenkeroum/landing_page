<?php

	if($_POST["email"] !== null){

		$email = $_POST['email'];

		// This line checks that we have a valid email address (Note: filter_var() requires PHP >= 5.2.0)
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$fp = fopen("email-addresses.csv", "a");
			$inputspace = $email . "\n";
			fwrite($fp, $inputspace);
			fclose($fp);
			$array = array('success' => "Thank you ! You will hear from us soon.");
			echo json_encode($array);

		}else {
			$array = array('error' => "Please provide us a correct email address.");
			echo json_encode($array);
		}

	}


?>
