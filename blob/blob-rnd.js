import {Blob,Buffer} from "node:buffer"
import { log } from "node:console"


const blob = new Blob(["ruhul amin","sdfs"])
blob.text().then((data)=>log(data))
blob.bytes().then((data)=>log(data))
