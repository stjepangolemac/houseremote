'use strict';

var check = function (_msg) {
    
    switch(msg.command) {
        case 'add':
            if(msg.timer == (null || undefined) || typeof msg.timer != 'object') return [false, 'no timer to add'];
            if(msg.timer.name == (null || undefined) || typeof msg.timer.name != 'string') return [false, 'invalid name'];
            if(msg.timer.device == (null || undefined) || typeof msg.timer.device != 'string') return [false, 'invalid device'];
            if(msg.timer.startTime == (null || undefined) || typeof msg.timer.startTime != 'number') return [false, 'invalid startTime'];
            if(msg.timer.endTime == (null || undefined) || typeof msg.timer.endTime != 'number') return [false, 'invalid endTime'];
            if(msg.timer.active == (null || undefined) || typeof msg.timer.active != 'boolean') return [false, 'invalid active'];
            if(msg.timer.enabled == (null || undefined) || typeof msg.timer.enabled != 'boolean') return [false, 'invalid enabled'];
            break;
        case 'remove':
            if(msg.timer == (null || undefined) || typeof msg.timer != 'object') return [false, 'no timer to remove'];
            if(msg.timer.name == (null || undefined) || typeof msg.timer.name != 'string') return [false, 'invalid name'];
            if(msg.timer.device == (null || undefined) || typeof msg.timer.device != 'string') return [false, 'invalid device'];
            if(msg.timer.startTime == (null || undefined) || typeof msg.timer.startTime != 'number') return [false, 'invalid startTime'];
            if(msg.timer.endTime == (null || undefined) || typeof msg.timer.endTime != 'number') return [false, 'invalid endTime'];
            if(msg.timer.active == (null || undefined) || typeof msg.timer.active != 'boolean') return [false, 'invalid active'];
            if(msg.timer.enabled == (null || undefined) || typeof msg.timer.enabled != 'boolean') return [false, 'invalid enabled'];
            break;
        case 'list':

            break;
        case 'trigger':
            if(msg.device == (null || undefined) || typeof msg.device != 'string') return [false, 'invalid device'];
            break;
        case 'enable':
            if(msg.timer == (null || undefined) || typeof msg.timer != 'object') return [false, 'no timer to remove'];
            if(msg.timer.name == (null || undefined) || typeof msg.timer.name != 'string') return [false, 'invalid name'];
            if(msg.timer.device == (null || undefined) || typeof msg.timer.device != 'string') return [false, 'invalid device'];
            if(msg.timer.startTime == (null || undefined) || typeof msg.timer.startTime != 'number') return [false, 'invalid startTime'];
            if(msg.timer.endTime == (null || undefined) || typeof msg.timer.endTime != 'number') return [false, 'invalid endTime'];
            if(msg.timer.active == (null || undefined) || typeof msg.timer.active != 'boolean') return [false, 'invalid active'];
            if(msg.timer.enabled == (null || undefined) || typeof msg.timer.enabled != 'boolean') return [false, 'invalid enabled'];
            break;
        case 'disable':
            if(msg.timer == (null || undefined) || typeof msg.timer != 'object') return [false, 'no timer to remove'];
            if(msg.timer.name == (null || undefined) || typeof msg.timer.name != 'string') return [false, 'invalid name'];
            if(msg.timer.device == (null || undefined) || typeof msg.timer.device != 'string') return [false, 'invalid device'];
            if(msg.timer.startTime == (null || undefined) || typeof msg.timer.startTime != 'number') return [false, 'invalid startTime'];
            if(msg.timer.endTime == (null || undefined) || typeof msg.timer.endTime != 'number') return [false, 'invalid endTime'];
            if(msg.timer.active == (null || undefined) || typeof msg.timer.active != 'boolean') return [false, 'invalid active'];
            if(msg.timer.enabled == (null || undefined) || typeof msg.timer.enabled != 'boolean') return [false, 'invalid enabled'];
            break;
        default:
            return [false, 'command is unknown'];
            break;
    }
    return [true, 'everything ok'];
};

module.exports = {check: check};