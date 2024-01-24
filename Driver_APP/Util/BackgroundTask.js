// import React, { useEffect } from "react";
// import * as TaskManager from "expo-task-manager";
// import * as BackgroundFetch from "expo-background-fetch";
// import { mobileApi } from "../config";

// export const TASK_NAME = "backgroundApiTask";

// export const backgroundApiTask = async () => {
//   try {
//     // Make your API call here
//     const response = await fetch(
//       `${mobileApi}/driver/updateVehicleLocation/1/24.85697423660765,67.11488641798496`
//     );
//     const data = await response.json();

//     console.log("backgroundData", data);
//     // Process the API response as needed

//     return BackgroundFetch.Result.NewData;
//   } catch (error) {
//     console.error("Background API Task Error:", error);
//     return BackgroundFetch.Result.Failed;
//   }
// };

// TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
//   if (error) {
//     console.error("Background task error:", error);
//     return;
//   }

//   if (data) {
//     const { taskId } = data;
//     console.log("Background task event received:", taskId);
//     await backgroundApiTask();
//     TaskManager.finishTaskAsync(taskId);
//   }
// });

// const registerBackgroundTask = async () => {
//   await BackgroundFetch.registerTaskAsync(TASK_NAME, {
//     minimumInterval: 60, // Minimum interval in seconds
//     stopOnTerminate: false, // Keep running after the app is closed
//     startOnBoot: true, // Start the task when the device boots
//   });
// };
