
import { WorkerService } from 'rn-workers';

const worker = new WorkerService();
/* get message from application. String only ! */
worker.onmessage = (message) => {
  if(message == 'start') {
    setInterval(() => {
      worker.postMessage('position');
    }, 1000)
  }
}
