import React,{useState,useEffect} from 'react'
import './info.css'
import * as XLSX from 'xlsx'
import thisData from './parse'

import Spreadsheet from "react-spreadsheet";

export default function Info(){
    const [dat, setDat] = useState([]);
    const click = () => {
        var throwaya = document.getElementById("thisclick").click();
        
        document.querySelector('#thisclick').addEventListener('change', async e =>{
            setDat([])
            document.getElementById("spread").style.display="block"
            document.getElementById("loader").style.display="block"
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (evt) => { 
                const bstr = evt.target.result;
                const name = file.name.toString();
                if(name.endsWith(".xlsx")||name.endsWith(".xls")){
                const wb = XLSX.read(bstr, {type:'binary'});
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_csv(ws, {header:1});
                let newdat = thisData(data,".xlsx");
                setDat(newdat);
                }
                else if(name.endsWith(".csv")){
                    setDat(await thisData(bstr,".csv"))
                    
                }
            };
            reader.readAsBinaryString(file);
            document.getElementById("spread").addEventListener("scroll",()=>{
                document.getElementById("loader").style.display="none"
            })
    })
}
    
    const handleClick = () => {
        let fram = document.getElementById("sample").style;
        if(fram.display==="none"){
        fram.display = "inline";
        fram.animation = "sho ease 1s forwards"
        document.getElementById("rotri").style.animation = "rotat 1s forwards"
        }
        else{
            fram.animation = "unsho ease 1s forwards"
            document.getElementById("rotri").style.animation = "unrotat 1s forwards"
            setTimeout(()=>{
                fram.display = "none";
            },1000)
        }
    
}

    return (
        <div style={{textAlign:"center"}}>
            <p style={{width:"75vw",backgroundColor:"rgba(0,171,105,0.1)",borderRadius:"10px",margin:"auto",marginTop:"5vh",padding:"20px",textAlign:"left", textJustify:"inter-word",display:"inline-block"}}>
                <b>Net Promoter Score</b> (NPS) is a widely used metric that measures customer loyalty and satisfaction. <br></br>
                It revolves around a single question: <br /><p style={{fontWeight:"normal",backgroundColor:"rgba(255,255,255,0.5)",width:"auto",padding:"10px",borderRadius:"5px",display:"inline-block"}}>"How likely are your patients to recommend your healthcare services to others?"</p><br></br>
                This helps gauge their overall satisfaction and likelihood to advocate for your services.<br /><br />
                Our NPS Dashboard provides you with valuable insights to measure and track the performance of your healthcare services.
            </p>
            <div style={{width:"75vw",margin:'auto',backgroundColor:"rgba(0,171,105,0.1)",borderRadius:"10px",padding:"20px",marginTop:"5vh",minHeight:"50px"}}>
            <button className="thisbutton" style={{border:"2px solid rgba(0,171,105)",borderRadius:"5px",padding:"15px",fontVariant:"all-small-caps",float:"left",cursor:"pointer",zIndex:"20"}} onClick={click}>   
                Upload
            </button>
            <div style={{float:"right"}}>
                <h4 style={{position:"relative",textAlign:"right",padding:"0px",marginTop:"15px",cursor:"pointer",width:"150px"}} onClick={handleClick}><div id="rotri" style={{position:"relative",rotate:"0deg",display:"inline-flex",translate:"0px 2px"}}>&#9663;</div>File Sample</h4>
                </div>
                <iframe id="sample" src="https://onedrive.live.com/embed?resid=BFDC453479679FF4!4675&ithint=file%2cxlsx&authkey=!AHgnKEG_K71daCk&em=2&wdAllowInteractivity=False&ejss=false" style={{width:"90%",height:"35vh",borderRadius:"10px",marginTop:"30px",display:"none"}}>
                </iframe>
            </div>
            <div style={{width:"75vw",margin:'auto',marginTop:"5vh"}}>
            
                <input type='file' id="thisclick" style={{display:"none"}} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"></input>
            </div>
            <div id="spread" style={{width:"auto",maxWidth:"calc(75vw + 40px)",height:"calc(35vh + 40px)",margin:'auto',marginTop:"5vh",overflow:"scroll",backgroundColor:"rgba(0,0,0,0.1)",borderRadius:"10px",marginBottom:"30px",display:"none"}}>
            <Spreadsheet id="spread" data={dat} />
            <div id="loader" style={{position:"relative",display:"block",zIndex:"20",marginTop:"10%",top:"20px"}}>
                <img
                    id="load"
                    src="loading.png"
                    width="50px"
                />
            </div>
            </div>
            
        </div>
    )
}