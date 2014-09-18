# Refrigerator
**General Electric Appliances Refrigerator Software Development Kit**

This node.js package provides functionality for communicating with a refrigerator via the [General Electric Appliance Software Development Kit](https://github.com/GEMakers/gea-sdk). In order to use this software, you must first connect your refrigerator to your computer using the [Green Bean](https://github.com/GEMakers/green-bean).

&#x26a0; WARNING: To prevent a risk of personal injury or property damage use this device and the API to modify the functionality of your GE Appliance only as directed in the [Guide to Safe and Reliable Operation](#guide-to-safe-and-reliable-operation). While an appliance operates in Consumer Mode, the control software applies algorithms that help protect consumers from a risk of personal injury or property damage. However, in Native Mode, these algorithms are not active. Therefore you must follow all guidelines for Safe/Reliable Operation detailed below to prevent a risk of personal injury or property damage that can arise during Native Mode Operation.

## Guide to Safe and Reliable Operation
The interface between the green bean and the refrigerator can take place while the appliance is in either a consumer or a native mode.


**Consumer mode** allows developers to access the high-level algorithms of an appliance, such as changing the operational mode of the unit.
In consumer mode a user is unable change the low level functions that govern how a cycle runs.


**Native mode** allows a developer to create the low-level algorithms of an appliance, such as direct control of motors, fans, actuators, heaters, and other controlled devices.
While in native mode, high-level algorithms, such as maintaining cabinet temperature, are not operational.
Native mode allows a developer to, for example, utilize loads to create algorithms not supported by the control.
While operating in native mode, the developer must adhere to the following rules:

1. The user should not activate the defrost heater(s) and the compressor concurrently as this may exceed rated current.
1. The user should not activate the defrost heater(s) and the hot water heater concurrently as this may exceed rated current.
1. The hot water heater should never be on without water in the water tank, as this will damage the heater.
1. Use extreme caution when operating the hot water dispensing feature. The water being dispensed can be very hot. Water temperatures above 125 degrees Fahrenheit (52 degrees Celsius) can cause severe burns or death from scalding. Children, the disabled, and the elderly are at highest risk of being scalded. Always allow water to cool to drinkable temperature and test the temperature of the water before drinking.
1. To avoid excessive component temperatures always run the condenser fan when the compressor is running.
1. Do not dispense water or ice without an appropriate containers in place.
1. Icemaker fills should be limited in order to prevent leakage or flooding.
1. Changes that affect defrost functionality can lead to freezing of the evaporator drain. Freezing of the drain tube can lead to water leaking out of the front of the refrigerator during a defrost cycle.
1. Freezing temperatures in the fresh food compartment can lead to water filter or water valve damage that can result in leaking water.
1. Warm temperatures in the icebox or in the freezer can lead to melting of ice or melting of the evaporator ice that can lead to water leaking out of the front of the refrigerator.
1. No ice dispense should be performed with doors open.
1. Whenever the water dispense or icemaker fill function is required you must turn on the isolation valve as well as the appropriate dispense valve (water or icemaker).
1. Dispenser solenoids are not designed to operate continuously. The solenoids should not be activated longer than 10 minutes.
1. Leaving interior cabinet lights on indefinitely will affect temperature control performance and may result in discoloration of plastic liners. Limit continuous on time to 10 minutes.
1. To prevent spoilage of food it is recommended to set the freezer and fresh food temperatures to 0 and 37 degrees Fahrenheit, respectively.
1. Dampers within the system could become stuck if left in one position for an extended period of time. It is recommended that they be cycled at least once every hour during operation.
1. Excessive relay cycling can shorten the life of the relays.
1. To maintain native mode operation, the native mode command must be sent at least once every 30 minutes (15 minute periodic rate is recommended).


## Overview

1. [Using the Software](#using-the-software)
  - [refrigerator.filterAlert](#refrigeratorfilteralert)
  - [refrigerator.filterExpirationStatus](#refrigeratorfilterexpirationstatus)
  - [refrigerator.commandFeatures](#refrigeratorcommandfeatures)
  - [refrigerator.temperatureAlert](#refrigeratortemperaturealert)
  - [refrigerator.displayTemperature](#refrigeratordisplaytemperature)
  - [refrigerator.setpointTemperature](#refrigeratorsetpointtemperature)
  - [refrigerator.doorAlarmAlert](#refrigeratordooralarmalert)
  - [refrigerator.iceMakerBucketStatus](#refrigeratoricemakerbucketstatus)
  - [refrigerator.odorFilterExpirationStatus](#refrigeratorodorfilterexpirationstatus)
  - [refrigerator.doorState](#refrigeratordoorstate)
  - [refrigerator.doorBoard.information](#refrigeratordoorboardinformation)
1. [Appendix](#appendix)
  - [Filter alert](#filter-alert)
  - [Command features](#command-features)
  - [Temperature alert](#temperature-alert)
  - [Door alarm alert](#door-alarm-alert)
  - [Ice maker bucket status](#ice-maker-bucket-status)
  - [Door state](#door-state)
  - [DC switch state](#dc-switch-state)
  - [AC input state](#ac-input-state)
  - [Extended DC switch state](#extended-dc-switch-state)
  - [Relay status](#relay-status)
  - [Duct door status](#duct-door-status)

### Using the Software
Below are a few node.js applications that demonstrate how to use this package to interact with a refrigerator.

#### *refrigerator.filterAlert*
The filter alert is a read-only unsigned integer value of the [filter alert](#filter-alert) bit field.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("refrigerator", function(refrigerator) {
    refrigerator.filterAlert.read(function (value) {
        console.log("filter alert is:", value);
    });

    refrigerator.filterAlert.subscribe(function (value) {
        console.log("filter alert changed:", value);
    });
});
```

#### *refrigerator.filterExpirationStatus*
The filter expiration status is a read-only object with the following fields:
- waterFilterCalendarTimer (an integer representing the amount of water filter time used in half hours)
- waterFilterCalendarPercentUsed (an integer representing the  percentage of the water filter used by time)
- waterFilterHoursRemaining (an integer representing the  number of hours remaining before the water filter needs to be changed)
- waterUsageTimer (an integer representing the amount of water used in hundreds of ounces)
- waterFilterUsageTimePercentUsed (an integer representing the  percentage of the water filter used by water usage)
- waterFilterOuncesRemaining (an integer representing the  number of ounces remaining before the water filter needs to be changed)

``` javascript
var greenBean = require("green-bean");

greenBean.connect("refrigerator", function(refrigerator) {
    refrigerator.filterExpirationStatus.read(function (value) {
      console.log("filter expiration status is:", value);
    });

    refrigerator.filterExpirationStatus.subscribe(function (value) {
      console.log("filter expiration status changed:", value);
    });
});
```

#### *refrigerator.commandFeatures*
The command features are an unsigned integer value of the [command features](#command-features) bit field.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("refrigerator", function(refrigerator) {
    refrigerator.commandFeatures.read(function (value) {
        console.log("command features are:", value);
    });

    refrigerator.commandFeatures.subscribe(function (value) {
        console.log("command features changed:", value);
    });

    refrigerator.commandFeatures.write(1);
});
```

#### *refrigerator.temperatureAlert*
The temperature alert is a read-only unsigned integer value of the [temperature alert](#temperature-alert) bit field.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("refrigerator", function(refrigerator) {
    refrigerator.temperatureAlert.read(function (value) {
        console.log("temperature alert is:", value);
    });

    refrigerator.temperatureAlert.subscribe(function (value) {
        console.log("temperature alert changed:", value);
    });
});
```

#### *refrigerator.displayTemperature*
The display temperature is a read-only object with the following fields:
- freshFoodTemperature (an integer representing the temperature displayed for the fresh food in degrees F)
- freezerTemperature (an integer representing the  temperature displayed for the freezer in degrees F)

``` javascript
var greenBean = require("green-bean");

greenBean.connect("refrigerator", function(refrigerator) {
    refrigerator.displayTemperature.read(function (value) {
        console.log("display temperature is:", value);
    });

    refrigerator.displayTemperature.subscribe(function (value) {
        console.log("display temperature changed:", value);
    });
});
```

#### *refrigerator.setpointTemperature*
The setpoint temperature is a read-only object with the following fields:
- freshFoodTemperature (an integer representing the desired temperature for the fresh food in degrees F)
- freezerTemperature (an integer representing the desired temperature for the freezer in degrees F)

``` javascript
var greenBean = require("green-bean");

greenBean.connect("refrigerator", function(refrigerator) {
    refrigerator.setpointTemperature.read(function (value) {
        console.log("setpoint temperature is:", value);
    });

    refrigerator.setpointTemperature.subscribe(function (value) {
        console.log("setpoint temperature changed:", value);
    });
});
```

#### *refrigerator.doorAlarmAlert*
The door alarm alert is a read-only unsigned integer value of the [door alarm alert](#door-alarm-alert) bit field.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("refrigerator", function(refrigerator) {
    refrigerator.doorAlarmAlert.read(function (value) {
        console.log("door alarm alert is:", value);
    });

    refrigerator.doorAlarmAlert.subscribe(function (value) {
        console.log("door alarm alert changed:", value);
    });
});
```

#### *refrigerator.iceMakerBucketStatus*
The ice maker bucket status is a read-only unsigned integer value of the [ice maker bucket status](#ice-maker-bucket-status) bit field.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("refrigerator", function(refrigerator) {
    refrigerator.iceMakerBucketStatus.read(function (value) {
        console.log("ice maker bucket status is:", value);
    });

    refrigerator.iceMakerBucketStatus.subscribe(function (value) {
        console.log("ice maker bucket status changed:", value);
    });
});
```

#### *refrigerator.odorFilterExpirationStatus*
The odor filter expiration status is a read-only object with the following fields:
- odorFilterCalendarTimer (an integer representing the amount of odor filter time used in half hours)
- odorFilterPercentUsed (an integer representing the percentage of the odor filter used by time)
- odorFilterHoursRemaining (an integer representing the number of hours remaining before the odor filter needs to be changed)

``` javascript
var greenBean = require("green-bean");

greenBean.connect("refrigerator", function(refrigerator) {
    refrigerator.odorFilterExpirationStatus.read(function (value) {
        console.log("odor filter expiration status is:", value);
    });

    refrigerator.odorFilterExpirationStatus.subscribe(function (value) {
        console.log("odor filter expiration status changed:", value);
    });
});
```

#### *refrigerator.doorState*
The door state is a read-only object with the following fields:
- doorState (an unsigned integer value of the [door state](#door-state) bit field)
- dcSwitchState (an unsigned integer value of the [DC switch state](#dc-switch-state) bit field)
- acInputState (an unsigned integer value of the [AC input state](#ac-input-state) bit field)

``` javascript
var greenBean = require("green-bean");

greenBean.connect("refrigerator", function(refrigerator) {
    refrigerator.doorState.read(function (value) {
        console.log("door state is:", value);
    });

    refrigerator.doorState.subscribe(function (value) {
        console.log("door state changed:", value);
    });
});
```

#### *refrigerator.doorBoard.information*
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
var greenBean = require("green-bean");

greenBean.connect("refrigerator", function(refrigerator) {
    refrigerator.doorBoard.information.read(function (value) {
        console.log("door board information is:", value);
    });

    refrigerator.doorBoard.information.subscribe(function (value) {
        console.log("door board information changed:", value);
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
