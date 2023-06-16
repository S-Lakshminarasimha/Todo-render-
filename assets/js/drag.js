const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll("#tasks");

let task_id = null
let currentTaskZone = 'notstarted'
draggables.forEach((task) => {
  task.addEventListener("dragstart", (e) => {
    task_id = task.getAttribute('data-id')
    console.log(task_id)
    task.classList.add("is-dragging");
    currentTaskZone = document.querySelector(".is-dragging").parentElement.parentElement.getAttribute("data-zone");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};


droppables.forEach((zone)=>{
  zone.addEventListener('drop',()=>{
    let xhr = new XMLHttpRequest();
  // Open the request
    let dst_zone = zone.parentElement.getAttribute('data-zone')
    console.log(currentTaskZone,dst_zone,task_id)
    xhr.open('GET', `/profile/moveData/${task_id}/${dst_zone}/${currentTaskZone}`);
  // Send the request
   xhr.send();
  })
})


