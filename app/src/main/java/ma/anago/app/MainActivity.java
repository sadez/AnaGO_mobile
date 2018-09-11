package ma.anago.app;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.GeolocationPermissions;

public class MainActivity extends Activity {

    private static final int MY_PERMISSIONS_REQUEST_LOCATION = 1;
    private WebView mWebView;
    private String mGeoLocationRequestOrigin;
    private GeolocationPermissions.Callback mGeoLocationCallback;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);



        mWebView = (WebView) findViewById(R.id.activity_main_webview);

        // Enable Javascript
        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);

        // Force links and redirects to open in the WebView instead of in a browser
        mWebView.setWebViewClient(new WebViewClient());

        webSettings.setJavaScriptEnabled(true);
        webSettings.setGeolocationEnabled(true);

         mWebView.setWebViewClient(new MyWebViewClient());
         mWebView.setWebChromeClient(new WebChromeClient() {
             @Override
             public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                 android.util.Log.d("WebView", consoleMessage.message());
                 return true;
             }

             @Override
             public void onGeolocationPermissionsShowPrompt(final String origin, final GeolocationPermissions.Callback callback) {
                //callback.invoke(origin, true, false);

                mGeoLocationRequestOrigin = null;
                mGeoLocationCallback = null;

                statusCheck();
                if(ContextCompat.checkSelfPermission(MainActivity.this , Manifest.permission.ACCESS_FINE_LOCATION )
                        != PackageManager.PERMISSION_GRANTED){

                    if(ActivityCompat.shouldShowRequestPermissionRationale(MainActivity.this,
                            Manifest.permission.ACCESS_FINE_LOCATION)){

                        new AlertDialog.Builder(MainActivity.this)
                                .setMessage("Would like to use your Current Location ")
                                .setNeutralButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialogInterface, int i) {
                                        mGeoLocationRequestOrigin = origin;
                                        mGeoLocationCallback = callback;
                                        ActivityCompat.requestPermissions(MainActivity.this,
                                                new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                                                0);
                                    }
                                }).show();
                    }else {
                        Log.d("MainActivity","yelseee ");

                        mGeoLocationRequestOrigin = origin;
                        mGeoLocationCallback = callback;
                        ActivityCompat.requestPermissions(MainActivity.this,
                                new String[]{Manifest.permission.ACCESS_FINE_LOCATION},MY_PERMISSIONS_REQUEST_LOCATION);

                    }
                }else {
                    Log.d("MainActivity","yelseee ");

                    callback.invoke(origin, true, true);
                }


//                final boolean remember = false;
//                AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
//                builder.setTitle("Locations");
//                builder.setMessage("Would like to use your Current Location ")
//                        .setCancelable(true).setPositiveButton("Allow", new DialogInterface.OnClickListener() {
//                    public void onClick(DialogInterface dialog, int id) {
//                        // origin, allow, remember
//                        callback.invoke(origin, true, remember);
//                    }
//                }).setNegativeButton("Don't Allow", new DialogInterface.OnClickListener() {
//                    public void onClick(DialogInterface dialog, int id) {
//                        // origin, allow, remember
//                        callback.invoke(origin, false, remember);
//                    }
//                });
//                AlertDialog alert = builder.create();
//                alert.show();
            }

        });
        mWebView.getSettings().setAppCacheEnabled(true);
        mWebView.getSettings().setDatabaseEnabled(true);
        mWebView.getSettings().setDomStorageEnabled(true);
        mWebView.loadUrl("https://anago.ma/");
        //mWebView.getSettings().setGeolocationDatabasePath(getFilesDir().getPath());
        // LOCAL RESOURCE
        // mWebView.loadUrl("file:///android_asset/index.html");
    }

    // Prevent the back-button from closing the app
    @Override
    public void onBackPressed() {
        if(mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }


    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case MY_PERMISSIONS_REQUEST_LOCATION: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Log.d("MainActivity","yay! Do the ");

                    // permission was granted, yay! Do the

                    if(mGeoLocationCallback != null){
                        mGeoLocationCallback.invoke(mGeoLocationRequestOrigin,true,true);
                        Log.d("MainActivity","Mon age est de ");
                    }
                    // contacts-related task you need to do.
                } else {
                    Log.d("MainActivity","dsdssd ");
                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                    if(mGeoLocationCallback != null){
                        mGeoLocationCallback.invoke(mGeoLocationRequestOrigin,false,false);
                    }
                }
                return;
            }

            // other 'case' lines to check for other
            // permissions this app might request.
        }
    }



    public void statusCheck() {
        final LocationManager manager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        if (!manager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
            buildAlertMessageNoGps();

        }
    }

    private void buildAlertMessageNoGps() {
        final AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setMessage("Votre GPS est désactivé , voulez vous l'activer ?")
                .setCancelable(false)
                .setPositiveButton("Oui", new DialogInterface.OnClickListener() {
                    public void onClick(final DialogInterface dialog, final int id) {
                        startActivity(new Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS));
                    }
                })
                .setNegativeButton("Non", new DialogInterface.OnClickListener() {
                    public void onClick(final DialogInterface dialog, final int id) {
                        dialog.cancel();
                    }
                });
        final AlertDialog alert = builder.create();
        alert.show();
    }
}

