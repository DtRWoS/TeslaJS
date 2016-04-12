//==========================================================================
// This Express sample demonstrates mocking the TeslaJS REST API for testing
//
// Github: https://github.com/mseminatore/TeslaJS
// NPM: https://www.npmjs.com/package/teslajs
//
// Copyright (c) 2016 Mark Seminatore
//
// Refer to included LICENSE file for usage rights and restrictions
//==========================================================================

var express = require('express');
var app = express();

// Globals
var vid = 321;

//
//
//
app.get('/', function (req, res) {
  res.send('Hello from Mockla!');
});

//=============================
// Mock the OAuth login command
//=============================
app.post('/oauth/token', function (req, res) {
    console.log(JSON.stringify(req));

    // TODO - validate the request before responding
    res.json({
        "access_token": "abc123",
        "token_type": "bearer",
        "expires_in": 7776000,
        "created_at": new Date().getMilliseconds()   // 1457385291
    });
});

//==========================
// Mock the GET vehicles cmd
//==========================
app.get('/api/1/vehicles', function (req, res) {
    res.json({
        "response": [
            {
                "color": "black",
                "display_name": "Kit",
                "id": vid,
                "id_s": vid.toString(),
                "option_codes": "MS01,RENA,TM00,DRLH,PF00,BT85,PBCW,RFPO,WT19,IBMB,IDPB,TR00,SU01,SC01,TP01,AU01,CH00,HP00,PA00,PS00,AD02,X020,X025,X001,X003,X007,X011,X013",
                "user_id": 123,
                "vehicle_id": 1234567890,
                "vin": "5YJSA1CN5CFP01657",
                "tokens": [
                    "123",
                    "456"],
                "state": "online"
            }],
        "count": 1
    });
});

//===============================
// Mock the GET vehicle_state cmd
//===============================
app.get('/api/1/vehicles/321/data_request/vehicle_state', function (req, res) {
    res.json({
        "response": {
            "df": false,                  // driver's side front door open
            "dr": false,                  // driver's side rear door open
            "pf": false,                  // passenger's side front door open
            "pr": false,                  // passenger's side rear door open
            "ft": false,                  // front trunk is open
            "rt": false,                  // rear trunk is open
            "car_version": "1.19.42",      // car firmware version
            "locked": true,               // car is locked
            "sun_roof_installed": false,  // panoramic roof is installed
            "sun_roof_state": "unknown",
            "sun_roof_percent_open": 0,   // null if not installed
            "dark_rims": false,           // gray rims installed
            "wheel_type": "Base19",       // wheel type installed
            "has_spoiler": false,         // spoiler is installed
            "roof_color": "Colored",      // "None" for panoramic roof
            "perf_config": "Base",
            "vehicle_name": "Kit",        // display name if set
            "valet_mode": false           // true if valet mode is active
        }
    });
});

//===============================
// Mock the GET charge_state cmd
//===============================
app.get('/api/1/vehicles/321/data_request/charge_state', function (req, res) {
    res.json({
        "response": {
            "charging_state": "Complete",  // "Charging", ??
            "charge_to_max_range": false,  // current std/max-range setting
            "max_range_charge_counter": 0,
            "fast_charger_present": false, // connected to Supercharger?
            "battery_range": 239.02,       // rated miles
            "est_battery_range": 155.79,   // range estimated from recent driving
            "ideal_battery_range": 275.09, // ideal miles
            "battery_level": 91,           // integer charge percentage
            "battery_current": -0.6,       // current flowing into battery
            "charge_starting_range": null,
            "charge_starting_soc": null,
            "charger_voltage": 0,          // only has value while charging
            "charger_pilot_current": 40,   // max current allowed by charger & adapter
            "charger_actual_current": 0,   // current actually being drawn
            "charger_power": 0,            // kW (rounded down) of charger
            "time_to_full_charge": null,   // valid only while charging
            "charge_rate": -1.0,           // float mi/hr charging or -1 if not charging
            "charge_port_door_open": true,
            "charge_limit_soc": 90
        }
    });
});

//===============================
// Mock the GET drive_state cmd
//===============================
app.get('/api/1/vehicles/321/data_request/drive_state', function (req, res) {
    res.json({
        "response": {
            "shift_state": null,          //
            "speed": null,                //
            "latitude": 33.794839,        // degrees N of equator
            "longitude": -84.401593,      // degrees W of the prime meridian
            "heading": 4,                 // integer compass heading, 0-359
            "gps_as_of": 1359863204       // Unix timestamp of GPS fix
        }
    });
});

//===============================
// Mock the GET climate_state cmd
//===============================
app.get('/api/1/vehicles/321/data_request/climate_state', function (req, res) {
    res.json({
        "response": {
            "inside_temp": 17.0,          // degC inside car
            "outside_temp": 9.5,          // degC outside car or null
            "driver_temp_setting": 22.6,  // degC of driver temperature setpoint
            "passenger_temp_setting": 22.6, // degC of passenger temperature setpoint
            "is_auto_conditioning_on": false, // apparently even if on
            "is_front_defroster_on": null, // null or boolean as integer?
            "is_rear_defroster_on": false,
            "fan_status": 0               // fan speed 0-6 or null
        }
    });
});

//===============================
// Setup our listen server
//===============================
app.listen(3000, function () {
  console.log('Mockla app listening on port 3000!');
});
