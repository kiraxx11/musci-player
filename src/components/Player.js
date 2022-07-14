import React, { useState,useRef,useEffect } from "react";
import '../styles/player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayPause, faCirclePlay, faCirclePause } from '@fortawesome/free-regular-svg-icons'


const Player = ({song}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setcurrentTime] = useState(0);

    const audioPlayer = useRef()
    const progressBar=useRef()
    const animationRef=useRef()
    
    
    useEffect(()=>{
        const seconds=Math.floor(audioPlayer.current.duration)
        setDuration(seconds);
        progressBar.current.max=seconds;

    },[audioPlayer?.current?.loadedmetadata,audioPlayer?.current?.redayState]);
    

    const calculateTime=(secs)=>{
        const minutes =Math.floor(secs/60);
        const returnedMinutes=minutes<10?`0${minutes}`:`${minutes}`
        const seconds =Math.floor(secs%60);
        const returnedSeconds=seconds<10?`0${seconds}`:`${seconds}`
        return `${returnedMinutes}:${returnedSeconds}`
        
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
    

    return (
        <div className="playerContainer">
            <div className="player">
                <audio autoPlay ref={audioPlayer} src={song.preview} preload="metadata" />
                <p className="tittlePlayer">{song.title}</p>
                <div>{calculateTime(currentTime)}</div>

                <div className="progressBarWrapper">
                    <input type='range' className="progressBar" defaultValue='0' ref={progressBar} onChange={changeRange}/>
                    
                </div>


                <div>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
                
                <button onClick={tooglePlayPause} className='PlayPause'>
                    {isPlaying ? <FontAwesomeIcon icon={faCirclePause} /> : <FontAwesomeIcon icon={faCirclePlay} />}

                </button>
            </div>

        </div>
    )
}

export { Player }