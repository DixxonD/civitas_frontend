import React from "react";

export default {
    welcomeTextAddStorage: 'Welcome to the guide to add storage devices. This guide will walk you through the process to add a storage device. Let\'s get started!',
    plugOutDevice: 'Make sure that the storage device you want to add is not plugged into the Raspberry Pi. Otherwise unplug the USB connector of the storage device.',
    plugInDevice: 'After the system has acquired the initial state, you can plug the storage device you want to add to the system into the Raspberry Pi.',
    bluePortsHint: 'Tip: The blue USB ports on the Raspberry Pi offer faster data transfer.',
    goToNextStep: 'Go to the next step when this is done.',
    noDeviceFound: 'No device was found.',
    deviceFound: 'The following device was detected:',
    confirmDevice: 'If this is the correct storage device, proceed to the next step. Otherwise, restart the device detection from the beginning.',
    allDone: 'All Done. Congratulations! ',


    welcomeTextCreateRAID: 'This guide helps to select two storage devices to be mirrored. This will help prevent data loss if one storage device breaks.',
    atLeastToDevices: 'At least two storage devices must be added to the system first.',

    welcomeTextAddRemoteStorage: 'This guide will help you to find other nodes to store your data there. The owner of the selected node will provide you with storage space.',
    localStorageMissing: (<>Set up the <a href='/addLocalStorage'>local storage</a> first before you worry about the remote storage.</>)
}