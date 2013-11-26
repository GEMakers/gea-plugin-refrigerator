/*
 * Copyright (c) 2013 - General Electric - Confidential - All Rights Reserved
 * 
 * Author: Christopher Baker <christopher.baker2@ge.com>
 *  
 */

const REFRIGERATOR_BASE = 0x1000;
const COMMAND_REQUEST_DOOR_STATE = 0x23;

function Refrigerator (appliance, base) {
    appliance.filterAlert = appliance.erd({
        erd: base++,
        format: "UInt8"
    });

    appliance.filterExpirationStatus = appliance.erd({
        erd: base++,
        endian: "big",
        format: [
            "waterFilterCalendarTimer:UInt16",
            "waterFilterCalendarPercentUsed:UInt8",
            "waterFilterHoursRemaining:UInt16",
            "waterUsageTimer:UInt32",
            "waterFilterUsageTimePercentUsed:UInt8",
            "waterFilterOuncesRemaining:UInt32"
        ]
    });
    
    appliance.commandFeatures = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.temperatureAlert = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.displayTemperature = appliance.erd({
        erd: base++,
        format: [
            "freshFoodTemperature:UInt8",
            "freezerTemperature:UInt8"
        ]
    });
    
    appliance.setpointTemperature = appliance.erd({
        erd: base++,
        format: [
            "freshFoodTemperature:UInt8",
            "freezerTemperature:UInt8"
        ]
    });
    
    appliance.doorAlarmAlert = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.iceMakerBucketStatus = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.odorFilterExpirationStatus = appliance.erd({
        erd: base++,
        endian: "big",
        format: [
            "odorFilterCalendarTimer:UInt16",
            "odorFilterPercentUsed:UInt8",
            "odorFilterHoursRemaining:UInt16"
        ]
    });
    
    appliance.doorState = appliance.command({
        command: COMMAND_REQUEST_DOOR_STATE,
        format: [
            "doorState:UInt8",
            "dcSwitchState:UInt8",
            "acInputState:UInt8"
        ]
    });
    
    return appliance;
}

exports.plugin = function (bus, configuration, callback) {
    bus.on("appliance", function (appliance) {
        appliance.read(REFRIGERATOR_BASE, function (value) {
            bus.emit("refrigerator", Refrigerator(appliance, REFRIGERATOR_BASE));
        });
    });
    
    callback(bus);
};

