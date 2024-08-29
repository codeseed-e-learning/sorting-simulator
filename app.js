const addElement = (parent, elementTag, textContent = "") => {
    const newElement = document.createElement(elementTag);
    newElement.textContent = textContent;
    parent.appendChild(newElement);
  };
  
  const setArr = document.querySelector("#setarray");
  setArr.addEventListener("click", () => {
    const inputArray = document.querySelector("#array").value;
    const originalNumbers = document.querySelector("#origin-numbers");
    originalNumbers.innerHTML = "";
    const numrics = inputArray.split(",").map(Number);
  
    for (let i = 0; i < numrics.length; i++) {
      const element = document.createElement("div");
      element.className =
        "numbers bg-black text-white rounded-lg mx-1 flex justify-center items-end transition-all duration-500 ease-in-out";
      element.style.width = "40px"; // Fixed width for the bar
      element.style.height = `${numrics[i] * 10}px`; // Dynamic height based on value
      element.textContent = numrics[i];
      originalNumbers.appendChild(element);
    }
  });
  
  const swapElements = (el1, el2) => {
    return new Promise((resolve) => {
      const parent = el1.parentNode;
      const el1Clone = el1.cloneNode(true);
      const el2Clone = el2.cloneNode(true);
  
      parent.replaceChild(el1Clone, el2);
      parent.replaceChild(el2Clone, el1);
  
      setTimeout(() => {
        resolve();
      }, 500); // Pause for 500ms
    });
  };
  
  const bubbleSort = async (arr) => {
    const originalNumbers = document.querySelector("#origin-numbers");
    const elements = originalNumbers.children;
  
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
  
          elements[j].style.backgroundColor = "red";
          elements[j + 1].style.backgroundColor = "red";
  
          await swapElements(elements[j], elements[j + 1]);
  
          elements[j].style.backgroundColor = "black";
          elements[j + 1].style.backgroundColor = "black";
        }
      }
    }
  };
  
  const selectionSort = async (arr) => {
    const originalNumbers = document.querySelector("#origin-numbers");
    const elements = originalNumbers.children;
  
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
  
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  
        elements[i].style.backgroundColor = "red";
        elements[minIndex].style.backgroundColor = "red";
  
        await swapElements(elements[i], elements[minIndex]);
  
        elements[i].style.backgroundColor = "black";
        elements[minIndex].style.backgroundColor = "black";
      }
    }
  };
  
  const insertionSort = async (arr) => {
    const originalNumbers = document.querySelector("#origin-numbers");
    const elements = originalNumbers.children;
  
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
  
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
  
        elements[j + 1].style.backgroundColor = "red";
        elements[j].style.backgroundColor = "red";
  
        await swapElements(elements[j + 1], elements[j]);
  
        elements[j + 1].style.backgroundColor = "black";
        elements[j].style.backgroundColor = "black";
  
        j--;
      }
      arr[j + 1] = key;
    }
  };
  
  const partition = async (arr, low, high) => {
    const originalNumbers = document.querySelector("#origin-numbers");
    const elements = originalNumbers.children;
    let pivot = arr[high];
    let i = low - 1;
  
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
  
        elements[i].style.backgroundColor = "red";
        elements[j].style.backgroundColor = "red";
  
        await swapElements(elements[i], elements[j]);
  
        elements[i].style.backgroundColor = "black";
        elements[j].style.backgroundColor = "black";
      }
    }
  
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
    elements[i + 1].style.backgroundColor = "red";
    elements[high].style.backgroundColor = "red";
  
    await swapElements(elements[i + 1], elements[high]);
  
    elements[i + 1].style.backgroundColor = "black";
    elements[high].style.backgroundColor = "black";
  
    return i + 1;
  };
  
  const quickSort = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };
  
  const merge = async (arr, l, m, r) => {
    const originalNumbers = document.querySelector("#origin-numbers");
    const elements = originalNumbers.children;
  
    let n1 = m - l + 1;
    let n2 = r - m;
  
    let L = new Array(n1);
    let R = new Array(n2);
  
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
  
    let i = 0,
      j = 0,
      k = l;
  
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        elements[k].style.height = `${arr[k] * 10}px`;
        elements[k].textContent = arr[k];
        i++;
      } else {
        arr[k] = R[j];
        elements[k].style.height = `${arr[k] * 10}px`;
        elements[k].textContent = arr[k];
        j++;
      }
      k++;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  
    while (i < n1) {
      arr[k] = L[i];
      elements[k].style.height = `${arr[k] * 10}px`;
      elements[k].textContent = arr[k];
      i++;
      k++;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  
    while (j < n2) {
      arr[k] = R[j];
      elements[k].style.height = `${arr[k] * 10}px`;
      elements[k].textContent = arr[k];
      j++;
      k++;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };
  
  const mergeSort = async (arr, l, r) => {
    if (l < r) {
      let m = Math.floor((l + r) / 2);
  
      await mergeSort(arr, l, m);
      await mergeSort(arr, m + 1, r);
      await merge(arr, l, m, r);
    }
  };
  
  const sortBtn = document.querySelector("#sort");
  sortBtn.addEventListener("click", async () => {
    const inputArray = document.querySelector("#array").value.split(",").map(Number);
    const method = document.querySelector("#sort-method").value;
  
    switch (method) {
      case "bubble":
        await bubbleSort(inputArray);
        break;
      case "selection":
        await selectionSort(inputArray);
        break;
      case "insertion":
        await insertionSort(inputArray);
        break;
      case "quick":
        await quickSort(inputArray, 0, inputArray.length - 1);
        break;
      case "merge":
        await mergeSort(inputArray, 0, inputArray.length - 1);
        break;
      default:
        break;
    }
  
    console.log("Sorted array:", inputArray);
  });
  
