/*
 * Copyright (c) 2014 General Electric
 *  
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 * 
 */

const REFRIGERATOR_BASE = 0x1000;
const ADDRESS_DOOR_BOARD = 0x03;
const COMMAND_REQUEST_DOOR_STATE = 0x23;
const COMMAND_REQUEST_ALL_DOOR_BOARD_INFO = 0x36;

function Refrigerator (bus, configuration, appliance, base) {
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
            "freshFoodTemperature:Int8",
            "freezerTemperature:Int8"
        ]
    });
    
    appliance.setpointTemperature = appliance.erd({
        erd: base++,
        format: [
            "freshFoodTemperature:Int8",
            "freezerTemperature:Int8"
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
    
    appliance.doorBoard = bus.endpoint(configuration.address, ADDRESS_DOOR_BOARD);
    
    appliance.doorBoard.information = appliance.doorBoard.command({
        command: COMMAND_REQUEST_ALL_DOOR_BOARD_INFO,
        endian: "big",
        format: [
            "iceMakerMoldThermistorTemperature:Int16",
            "iceCabinetThermistorTemperature:Int16",
            "hotWaterThermistor1Temperature:UInt16",
            "hotWaterThermistor2Temperature:UInt16",
            "dctSwitchState:UInt8",
            "relayStatus:UInt8",
            "ductDoorStatus:UInt8",
            "iceMakerStateSelection:UInt8",
            "iceMakerOperationalState:UInt8"
        ]
    });
    
    return appliance;
}

exports.plugin = function (bus, configuration, callback) {
    bus.on("appliance", function (appliance) {
        appliance.read(REFRIGERATOR_BASE, function (value) {
            bus.emit("refrigerator", 
                Refrigerator(bus, configuration, appliance, REFRIGERATOR_BASE));
        });
    });
    
    var create = bus.create;
    
    bus.create = function (name, callback) {
        create(name, function (appliance) {
            if (name == "refrigerator") {
                appliance.address = configuration.address;
                appliance.version = configuration.version;
                Refrigerator(bus, configuration, appliance, REFRIGERATOR_BASE);
            }
            
            callback(appliance);
        });
    };
    
    callback(bus);
};

