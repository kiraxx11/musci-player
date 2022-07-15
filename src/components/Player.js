import React, { useState,useRef,useEffect } from "react";
import '../styles/player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCirclePlay, faCirclePause,faXmarkCircle,faTired } from '@fortawesome/free-regular-svg-icons'

import {styled, Slider} from '@mui/material'
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
    
    const PSlider = styled(Slider)(({theme, ...props}) => ({
        color: 'gray',
        height: 3,
        width: 150,
        '&:hover': {
            cursor: 'auto',
        },
        '& .MuiSlider-thumb': {
            width: '10px',
            height: '10px',
            display: props.thumbless ? 'none' : 'block',
        }
    }))


const Player = ({song}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setcurrentTime] = useState(0);
    const [volume, setVolume] = useState(30);
    const [mute, setMute] = useState(false);
    
    const audioPlayer = useRef()
    const progressBar=useRef()
    const animationRef=useRef()
    

    
    useEffect(()=>{
        if(audioPlayer){
            audioPlayer.current.volume= volume /100;
        }
        

        

        const seconds=Math.floor(audioPlayer.current.duration)
        setDuration(seconds);
        progressBar.current.max=seconds;

    },[audioPlayer?.current?.loadedmetadata,audioPlayer?.current?.redayState,volume]);
    

    const calculateTime=(secs)=>{
        const minutes =Math.floor(secs/60);
        const returnedMinutes=minutes<10?`0${minutes}`:`${minutes}`;
        const seconds =Math.floor(secs%60);
        const returnedSeconds=seconds<10?`0${seconds}`:`${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
        
    }
  

    const tooglePlayPause = () => {
        const prevValue=isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current=requestAnimationFrame(whilePlaying)
        }else{
            audioPlayer.current.pause()
            cancelAnimationFrame(animationRef.current)
        }
    }
    const whilePlaying=()=>{
        progressBar.current.value=audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current=requestAnimationFrame(whilePlaying)

    }
    const changeRange=()=>{
        audioPlayer.currentTime=progressBar.current.value;
        changePlayerCurrentTime();
    }
    const changePlayerCurrentTime=()=>{
        progressBar.current.style.setProperty('--seek-before-width',`${progressBar.current.value/duration*100}%`)
        setcurrentTime(progressBar.current.value)
    }   
    
    function VolumeBtns(){
        return mute
            ? <VolumeOffIcon sx={{color: 'gray', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
            : volume <= 20 ? <VolumeMuteIcon sx={{color: 'gray', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
            : volume <= 75 ? <VolumeDownIcon sx={{color: 'gray', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
            : <VolumeUpIcon sx={{color: 'gray', '&:hover': {color: 'white'}}} onClick={() => setMute(!mute)} />
    }
    return (
        <div className="playerContainer">
            <div className="player">
                <audio autoPlay muted={mute} ref={audioPlayer} src={song.preview} preload="metadata" />
                <p className="tittlePlayer">{song.title}</p>
                <div>{calculateTime(currentTime)}</div>

                <div className="progressBarWrapper">
                    <input type='range' className="progressBar" defaultValue='0' ref={progressBar} onChange={changeRange}/>
                    
                </div>


                <div>{duration}</div>
                <div>
                <VolumeBtns/>
                <PSlider min={0} max={100} value={volume}
                            onChange={(e, v) => setVolume(v)}
                        />
                </div>
                
                <button onClick={tooglePlayPause} className='PlayPause'>
                    {isPlaying ? <FontAwesomeIcon icon={faCirclePause} /> : <FontAwesomeIcon icon={faCirclePlay} />}

                </button>
            </div>

        </div>
    )
}

export { Player }