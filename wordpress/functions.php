<?php
add_action( 'wp_enqueue_scripts', 'jupiter_child_enqueue_styles', 500 );
function jupiter_child_enqueue_styles() {
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

	$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG == true ? 'dev' : 'min' ;
	$theme = wp_get_theme();
	wp_register_style('theme-jupiter', get_stylesheet_directory_uri() . '/assets/css/style.'. $suffix .'.css', $theme->Version);
	wp_enqueue_style( 'theme-jupiter' );

	wp_register_script( "theme-jupiter-js", get_stylesheet_directory_uri() . '/assets/js/scripts.min.js', 'jquery', false, true );
	wp_enqueue_script( "theme-jupiter-js" );
}

function wpc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'wpc_mime_types');


/* Add menu support */
if (function_exists('add_theme_support')) {
    add_theme_support('menus');
}

/* Add post image support */
add_theme_support( 'post-thumbnails' );


/* Add custom thumbnail sizes */
if ( function_exists( 'add_image_size' ) ) {
    add_image_size( '300x180', 300, 180, true );
}

/*
|--------------------------------------------------------------------------
| Prepare REST
|--------------------------------------------------------------------------
*/

function prepare_rest($data, $post, $request){
    $_data = $data->data;

    // Thumbnails
    $thumbnail_id = get_post_thumbnail_id( $post->ID );
    $thumbnail300x180 = wp_get_attachment_image_src( $thumbnail_id, '300x180' );
    $thumbnailMedium = wp_get_attachment_image_src( $thumbnail_id, 'medium' );
    $full = wp_get_attachment_image_src( $thumbnail_id, 'full' );

    //Categories
    $cats = get_the_category($post->ID);

    //next/prev
    
    $nextPost = get_adjacent_post(false, '', true );
    $nextPost = $nextPost->ID;

    $prevPost = get_adjacent_post(false, '', false );
    $prevPost = $prevPost->ID;

    $_data['fi_300x180'] = $thumbnail300x180[0];
    $_data['fi_medium'] = $thumbnailMedium[0];
    $_data['full'] = $full[0];
    $_data['cats'] = $cats;
    $_data['next_post'] = $nextPost;
    $_data['previous_post'] = $prevPost;
    $data->data = $_data;

    return $data;
}
add_filter('rest_prepare_post', 'prepare_rest', 10, 3);

add_action('rest_api_init', 'register_custom_fields', 1, 1);

function register_custom_fields(){
    register_rest_field(
        'quotes',
        'author',
        array(
            'get_callback' => 'show_fields'
        )
    );

    register_rest_field(
        'quotes',
        'date_publish',
        array(
            'get_callback' => 'show_fields'
        )
    );

    register_rest_field(
        'quotes',
        'thumbnail',
        array(
            'get_callback' => 'show_fields'
        )
    );

    register_rest_field(
        'quotes',
        'theme',
        array(
            'get_callback' => 'show_fields'
        )
    );

    register_rest_field(
        'quotes',
        'quote_img',
        array(
            'get_callback' => 'show_fields'
        )
    );

    register_rest_field(
        'pub',
        'pub_link',
        array(
            'get_callback' => 'show_fields'
        )
    );

    register_rest_field(
        'pub',
        'pub_thumbnail',
        array(
            'get_callback' => 'show_fields'
        )
    );
}

function show_fields($object, $field_name, $request){
    $field_name = 'wpcf-' . $field_name;
    return get_post_meta($object['id'], $field_name, true);
}


//http://localhost/polarfront/wp-json/wp/v2/quotes
//http://polarfront.fr/wp-json/wp/v2/pub

