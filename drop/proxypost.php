<?php


	// Initialize curl
    $curl = curl_init();


	/*$data = array(
	  'name'      => 'adam',
	  'transmission'  => 'ios',
	  'uiJSON'       => "{'tester': 'yay', 'tester2': '2yay'}"
	);
	$data = "{'nexus_ui':'name'}" 

	$data = '{"nexus_ui":{"name":"Test UI 1","transmission":"ajax","uiJSON":"
					{\"twitter_handle\"=\u003e\"@BrianVanLoo2\", \"location\"=\u003e\"CA\"}
					}"
				}' */

 // $data =  "{  \"nexus_ui\": \"{   \"name\": \"test\",  \"transmission\": \"test\",  \"uiJSON\": \"{  \"bla\": \"one\"  }\"    }\"   }"

    $data = 'nexus_ui' => array(
	 	 'name'      => 'adam',
	 	 'transmission'  => 'ios',
	  	 'uiJSON'       => array(			
             'test' =>  'try'
	  	  )
	  	)

    // Configure curl options
    $opts = array(
        CURLOPT_URL             => "http://nexus.cct.lsu.edu:8000/nexus_uis",
        CURLOPT_RETURNTRANSFER  => true,
        CURLOPT_CUSTOMREQUEST   => 'POST',
        CURLOPT_POST            => 1,
        CURLOPT_POSTFIELDS      => json_encode( $data )
    );

    // Set curl options
    curl_setopt_array($curl, $opts);

    // Get the results
    $result = curl_exec($curl);

    // Close resource
    curl_close($curl);

    echo $result;
    echo "tester"
/*



	$data = array(
	  'userID'      => 'a7664093-502e-4d2b-bf30-25a2b26d6021',
	  'itemKind'    => 0,
	  'value'       => 1,
	  'description' => 'Boa saudaÁ„o.',
	  'itemID'      => '03e76d0a-8bab-11e0-8250-000c29b481aa'
	);

	$options = array(
	  'http' => array(
	    'method'  => 'POST',
	    'content' => json_encode( $data ),
	    'header'=>  "Content-Type: application/json\r\n" .
	                "Accept: application/json\r\n"
	    )
	);

	$context  = stream_context_create( $options );
	$result = file_get_contents( "http://nexus.cct.lsu.edu:8000/", false, $context );
	$response = json_decode( $result );

	echo $response
	echo $data

*/

?>
