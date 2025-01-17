/**********************************************************************
 * Copyright (C) 2023 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import type { Task } from '/@/stores/tasks';

import humanizeDuration from 'humanize-duration';

export interface TaskUI extends Task {
  age: string;
  progress?: number;
  hasGotoTask: boolean;
  gotoTask?: () => void;
}

export class TaskManager {
  toTaskUi(task: Task): TaskUI {
    const taskUI: TaskUI = {
      id: task.id,
      name: task.name,
      started: task.started,
      state: task.state,
      status: task.status,
      hasGotoTask: false,
      age: `${humanizeDuration(new Date().getTime() - task.started, { round: true, largest: 1 })} ago`,
    };

    if (task.status === 'in-progress') {
      taskUI.progress = task.progress;
      if (task.gotoTask) {
        taskUI.hasGotoTask = true;
        taskUI.gotoTask = task.gotoTask;
      } else {
        taskUI.hasGotoTask = false;
      }
    }
    return taskUI;
  }
}
