# Refrigerator Plugin for the GEA SDK

This node.js package provides functionality for communicating with a refrigerator via the [GEA SDK](https://github.com/GEMakers/gea-sdk).

## Installation
To install this application using the node.js package manager, issue the following commands:

```
npm install git+https://github.com/GEMakers/gea-plugin-refrigerator.git
```

To include the plugin in your application, use the *plugin* function after configuring your application.

``` javascript
var gea = require("gea-sdk");
var adapter = require("gea-adapter-usb");

// configure your application
var app = gea.configure({
    address: 0xcb
});

// include the refrigerator plugin in your application
app.plugin(require("gea-plugin-refrigerator"));

// bind to the adapter to access the bus
app.bind(adapter, function (bus) {
    // the bus now has all of the refrigerator plugin functions
});
```

## Refrigerator API
Below is the documentation for each of the functions provided by this plugin, as well as a few examples showing how to use them.

### *bus.on("refrigerator", callback)*
This event is emitted whenever a refrigerator has been discovered on the bus.
A refrigerator object is passed from the plugin to the function.
This refrigerator object inherits all functions and properties from the appliance object.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        console.log("address:", refrigerator.address);
        console.log("version:", refrigerator.version.join("."));
    });
});
```

### *refrigerator.filterAlert*
The filter alert is a read-only unsigned integer value of the [filter alert](#filter-alert) bit field.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        refrigerator.filterAlert.read(function (value) {
            console.log("read:", value);
        });
        
        refrigerator.filterAlert.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *refrigerator.filterExpirationStatus*
The filter expiration status is a read-only object with the following fields:
- waterFilterCalendarTimer (an integer representing the amount of water filter time used in half hours)
- waterFilterCalendarPercentUsed (an integer representing the  percentage of the water filter used by time)
- waterFilterHoursRemaining (an integer representing the  number of hours remaining before the water filter needs to be changed)
- waterUsageTimer (an integer representing the amount of water used in hundreds of ounces)
- waterFilterUsageTimePercentUsed (an integer representing the  percentage of the water filter used by water usage)
- waterFilterOuncesRemaining (an integer representing the  number of ounces remaining before the water filter needs to be changed)

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        refrigerator.filterExpirationStatus.read(function (value) {
            console.log("read:", value);
        });
        
        refrigerator.filterExpirationStatus.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *refrigerator.commandFeatures*
The command features are an unsigned integer value of the [command features](#command-features) bit field.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        refrigerator.commandFeatures.read(function (value) {
            console.log("read:", value);
        });
        
        refrigerator.commandFeatures.subscribe(function (value) {
            console.log("subscribe:", value);
        });
        
        refrigerator.commandFeatures.write(1);
    });
});
```

### *refrigerator.temperatureAlert*
The temperature alert is a read-only unsigned integer value of the [temperature alert](#temperature-alert) bit field.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        refrigerator.temperatureAlert.read(function (value) {
            console.log("read:", value);
        });
        
        refrigerator.temperatureAlert.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *refrigerator.displayTemperature*
The display temperature is a read-only object with the following fields:
- freshFoodTemperature (an integer representing the temperature displayed for the fresh food in degrees F)
- freezerTemperature (an integer representing the  temperature displayed for the freezer in degrees F)

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        refrigerator.displayTemperature.read(function (value) {
            console.log("read:", value);
        });
        
        refrigerator.displayTemperature.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *refrigerator.setpointTemperature*
The setpoint temperature is a read-only object with the following fields:
- freshFoodTemperature (an integer representing the desired temperature for the fresh food in degrees F)
- freezerTemperature (an integer representing the desired temperature for the freezer in degrees F)

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        refrigerator.setpointTemperature.read(function (value) {
            console.log("read:", value);
        });
        
        refrigerator.setpointTemperature.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *refrigerator.doorAlarmAlert*
The door alarm alert is a read-only unsigned integer value of the [door alarm alert](#door-alarm-alert) bit field.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        refrigerator.doorAlarmAlert.read(function (value) {
            console.log("read:", value);
        });
        
        refrigerator.doorAlarmAlert.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *refrigerator.iceMakerBucketStatus*
The ice maker bucket status is a read-only unsigned integer value of the [ice maker bucket status](#ice-maker-bucket-status) bit field.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        refrigerator.iceMakerBucketStatus.read(function (value) {
            console.log("read:", value);
        });
        
        refrigerator.iceMakerBucketStatus.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *refrigerator.odorFilterExpirationStatus*
The odor filter expiration status is a read-only object with the following fields:
- odorFilterCalendarTimer (an integer representing the amount of odor filter time used in half hours)
- odorFilterPercentUsed (an integer representing the percentage of the odor filter used by time)
- odorFilterHoursRemaining (an integer representing the number of hours remaining before the odor filter needs to be changed)

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        refrigerator.odorFilterExpirationStatus.read(function (value) {
            console.log("read:", value);
        });
        
        refrigerator.odorFilterExpirationStatus.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *refrigerator.doorState*
The door state is a read-only object with the following fields:
- doorState (an unsigned integer value of the [door state](#door-state) bit field)
- dcSwitchState (an unsigned integer value of the [DC switch state](#dc-switch-state) bit field)
- acInputState (an unsigned integer value of the [AC input state](#ac-input-state) bit field)

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        refrigerator.doorState.read(function (value) {
            console.log("read:", value);
        });
        
        refrigerator.doorState.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *refrigerator.doorBoard.information*
The door state is a read-only object with the following fields:
- iceMakerMoldThermistorTemperature (an integer representing the temperature of the mold thermistor in hundredths of degrees F)
- iceCabinetThermistorTemperature (an integer representing the temperature of the ice cabinet thermistor in hundredths of degrees F)
- hotWaterThermistor1Temperature (an integer representing the temperature of the first hot water thermistor in hundredths of degrees F)
- hotWaterThermistor2Temperature (an integer representing the temperature of the second hot water thermistor in hundredths of degrees F)
- dctSwitchState (an unsigned integer value of the [extended DC switch state](#extended-dc-switch-state) bit field)
- relayStatus (an unsigned integer value of the [relay status](#relay-status) bit field)
- ductDoorStatus (an unsigned integer value of the [duct door status](#duct-door-status) bit field)
- iceMakerStateSelection (an unsigned integer value representing the user selected state of the ice maker)
- iceMakerOperationalState (an unsigned integer value representing the operational state of the ice maker)

``` javascript
app.bind(adapter, function (bus) {
    bus.on("refrigerator", function (refrigerator) {
        refrigerator.doorBoard.information.read(function (value) {
            console.log("read:", value);
        });
        
        refrigerator.doorBoard.information.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

## Appendix

### Filter alert
The following is a diagram of the value for each bit in the filter alert.
If the bit is set (value is 1) then there is an alert for that value.
If the bit is cleared (value is 0) then that value has no alert.

| Bit     | Description              |
|:-------:|:-------------------------|
| 0       | Change water filter      |
| 1       | Change odor filter       |
| 2+      | Reserved                 |

### Command features
The following is a diagram of the value for each bit in the command features.
If the bit is set (value is 1) then that feature is enabled.
If the bit is cleared (value is 0) then that feature is disabled.

| Bit     | Description              |
|:-------:|:-------------------------|
| 0       | Sabbath mode             |
| 1+      | Reserved                 |

### Temperature alert
The following is a diagram of the value for each bit in the temperature alert.
If the bit is set (value is 1) then there is an alert for that value.
If the bit is cleared (value is 0) then that value has no alert.

| Bit     | Description                   |
|:-------:|:------------------------------|
| 0       | Fresh food above 50 degrees F |
| 1       | Freezer above 20 degrees F    |
| 2+      | Reserved                      |

### Door alarm alert
The following is a diagram of the value for each bit in the door alarm alert.
If the bit is set (value is 1) then there is an alert for that value.
If the bit is cleared (value is 0) then that value has no alert.

| Bit     | Description           |
|:-------:|:----------------------|
| 0       | Fresh food door alarm |
| 1       | Freezer door alarm    |
| 2+      | Reserved              |

### Ice maker bucket status
The following is a diagram of the value for each bit in the ice maker bucket status.
If the bit is set (value is 1) then the assertion is true.
If the bit is cleared (value is 0) then the assertion is false.

| Bit     | Description              |
|:-------:|:-------------------------|
| 0       | Has fresh food ice maker |
| 1       | Has freezer ice maker    |
| 2       | Fresh food bucket full   |
| 3       | Freezer bucket full      |
| 4+      | Reserved                 |

### Door state
The following is a diagram of the value for each bit in the door state.
If the bit is set (value is 1) then the door is open.
If the bit is cleared (value is 0) then the door is closed.

| Bit     | Description           |
|:-------:|:----------------------|
| 0       | Fresh food door       |
| 1       | Freezer door          |
| 2       | Reserved              |
| 3       | Freezer bottom door   |
| 4       | Fresh food left door  |
| 5       | Fresh food right door |
| 6+      | Reserved              |

### DC switch state
The following is a diagram of the value for each bit in the DC switch state.
If the bit is set (value is 1) then the assertion is true.
If the bit is cleared (value is 0) then the assertion is false.

| Bit     | Description                |
|:-------:|:---------------------------|
| 0       | Ice maker arm sensor full  |
| 1       | Ice maker rake sensor home |
| 2       | Over current tripped       |
| 3       | Damper in fault state      |
| 4+      | Reserved                   |

### AC input state
The following is a diagram of the value for each bit in the AC input state.
If the bit is set (value is 1) then the door is open.
If the bit is cleared (value is 0) then the door is closed.

| Bit     | Description                                      |
|:-------:|:-------------------------------------------------|
| 0       | Freezer top door, ice maker, or water cup switch |
| 1       | Freezer bottom door                              |
| 2       | Fresh food left door                             |
| 3       | Fresh food right door                            |
| 4+      | Reserved                                         |

### Extended DC switch state
The following is a diagram of the value for each bit in the extended DC switch state.
If the bit is set (value is 1) then the assertion is true.
If the bit is cleared (value is 0) then the assertion is false.

| Bit     | Description                   |
|:-------:|:------------------------------|
| 0       | Ice maker arm sensor full     |
| 1       | Ice maker rake sensor home    |
| 2       | Dispenser cup switch pressed  |
| 3       | Hot water cup switch pressed  |
| 4       | Hot water level switch full   |
| 5       | Over current detected input 1 |
| 6       | Over current detected input 2 |
| 7       | Reserved                      |

### Relay status
The following is a diagram of the value for each bit in the relay status.
If the bit is set (value is 1) then the assertion is true.
If the bit is cleared (value is 0) then the assertion is false.

| Bit     | Description           |
|:-------:|:----------------------|
| 0       | Auger motor direction |
| 1       | Auger motor run       |
| 2       | Hot water valve       |
| 3       | Ice maker mold heater |
| 4       | Ice maker water valve |
| 5       | Ice maker rake motor  |
| 6       | Dispenser water valve |
| 7       | Hot water heater      |

### Duct door status
The following is a diagram of the value for each bit in the duct door status.
If the bit is set (value is 1) then the door is open.
If the bit is cleared (value is 0) then the door is closed.

| Bit     | Description           |
|:-------:|:----------------------|
| 0       | Duct door is opened   |
| 1+      | Reserved              |





