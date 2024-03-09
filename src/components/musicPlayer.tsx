import { useEffect, useRef, useState } from 'react'; 
import Song from "../assets/media/A1.mp3";
import reactLogo from '../assets/react.svg';
import GoldenMain from '../assets/images/Golden-main.png';
import JKArtist from '../assets/images/JK-artist.webp';
import { data as albumData } from "../data/albumsData";

const MusicPlayer = () => {
    const[durationTime, setDurationTime] = useState<any>();
    const[currTime, setCurrTime] = useState<any>('0.00');
    const[songProgressBar, setSongProgressBar] = useState<number>(0);
    const[volumeVal, setVolumeVal] = useState<number>(43);
    const[isProgressBarChanged, setIsProgressBarChanged] = useState<boolean>(false);
    const[isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
    const[albumSelected, setAlbumSelected] = useState<any>({});
    const[isSongSelected, setIsSongSelected] = useState<number | null>(null);
    const[currentSongPlaying, setCurrentSongPlaying] = useState<any>(Song);
    const audioPlayerRef = useRef<HTMLAudioElement>(null);
    const audioSrcRef = useRef<HTMLSourceElement>(null);
    const audioPlayerInpRef = useRef<HTMLInputElement>(null);
    const audioVolInpRef = useRef<HTMLInputElement>(null);
    // let isAudioPlaying = false;
    // let durationTime;

    // useEffect(() => {
    //      durationTime = audioPlayerRef.current ? (Math.floor((audioPlayerRef?.current?.duration / 100) * 100) / 100) : 0;
    //      const mediaElem: any = document.querySelector("audio");
    //      mediaElem?.load();
    //      durationTime =  (Math.floor((mediaElem?.duration / 100) * 100) / 100);
    //      const gy = audioPlayerRef?.current;
    //      gy?.onloadedmetadata
    // }, [])
    // useEffect(() => {
    //     if(isSongSelected){
    //         onPlayAudio();
    //     }
    // }, [currentSongPlaying, isSongSelected])
    
    const onPlayAudio = () => {
        console.log("audioPlayerRef", audioPlayerRef?.current, isAudioPlaying, audioPlayerRef.current?.src)
        const audioEle = audioPlayerRef?.current;
        if(isAudioPlaying){
            audioEle && audioEle.pause();
            setIsAudioPlaying(false);
        }
        else {
            audioEle && audioEle.play();
            setIsAudioPlaying(true);
            
        }
        
    }
    // const callbackRef = (node: HTMLAudioElement) => {
    //     console.log('Attached node: ', node);
    //     if(node) {
    //         durationTime = (Math.floor((node.duration / 100) * 100) / 100)
    //     }
    // }
    const handleMetadata = (event: any) => {
        const val = Math.floor((event.currentTarget.duration / 100) * 100) / 100;
        setDurationTime(val)
    }
    const handleTimeUpdate = (event: any) => {
        const val = Math.floor((event.currentTarget.currentTime / 100) * 100) / 100;
        const finalVal = val === 0 ? '0.00' : val;
        const progressSongPerct = Math.floor((Number(finalVal) / durationTime) * 100)
        const audioInpEle = audioPlayerInpRef?.current;
        if(audioInpEle) audioInpEle.style.background = `linear-gradient(to right, #2dcf76 ${progressSongPerct}%, #808080 ${progressSongPerct}%)`;
        setCurrTime(finalVal)
        setSongProgressBar(progressSongPerct)
    }
    const onChangeAudio = (event: any) => {
        // console.log("onChangeAudio", event.currentTarget.value, (event.currentTarget.value * durationTime) / 100)
        const newVal = ((event.currentTarget.value * durationTime) / 100) * 100;
        const audioEle = audioPlayerRef?.current;
        if(audioEle)  audioEle.currentTime = newVal;
        setSongProgressBar(event.currentTarget.value)
        !isProgressBarChanged && setIsProgressBarChanged(true);
    }
    const onChangeSound = (event: any) => {
        const newVal = Number((event.currentTarget.value / 100).toFixed(2));
        const percentVal = Math.floor(event.currentTarget.value);
        const audioEle = audioPlayerRef?.current;
        // const finalVal = audioEle ? Math.min(1, audioEle.volume + newVal) : 0;
        console.log("newVal", newVal,  percentVal, event.currentTarget.value)
        if(audioEle)  audioEle.volume = newVal;
        const audioInpEle = audioVolInpRef?.current;
        if(audioInpEle) audioInpEle.style.background = `linear-gradient(to right, #2dcf76 ${percentVal}%, #808080 ${percentVal}%)`;
        setVolumeVal(percentVal);
    }
    // console.log("durationTime", durationTime)
    const onSelectAlbum = (album: any) => {
        console.log("album", album)
        setAlbumSelected(album);
    }
    const onHandleBackIcon = () => {
        setAlbumSelected({});
        setIsSongSelected(null);
    }
    const onSongSelect = (song: any) => {
        setIsSongSelected(song.id);
        setCurrentSongPlaying(song.songLink);
        // const audioEle = audioPlayerRef?.current;
        var audioEle = document.getElementById('test') as HTMLAudioElement;
        const audioSrc = audioSrcRef?.current;
        if(audioEle && audioSrc){
            audioSrc.src = song.songLink;
            if(isAudioPlaying){
                audioEle && audioEle.pause();
                setIsAudioPlaying(false);
            }
            else {
                audioEle && audioEle.play();
                setIsAudioPlaying(true);
                
            }
        }
        
        // console.log("audioPlayerRef88888888888",audioPlayerRef.current?.src)
    }
    console.log("audioPlayerRef",audioPlayerRef.current?.src)
    return (
        <div className="main-container">
            <div className="main-inner-container">
                <div className="side-left-bar">
                    <div className="inner-container">
                        <ul className="nav-tabs">
                            <li className='active'>Home</li>
                            <li className='active'>Search</li>
                        </ul>
                        <div className='library-details'>
                            <div className='library-section'>
                                <div><h4>Your library</h4></div>
                                <div><h4>Add</h4></div>
                            </div>
                            <div className='library-filter-tags-section'>
                                <div className='tag'>Playlist</div>
                                <div className='tag'>Albums</div>
                                <div className='tag'>Artist</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="songs-list">
                            <audio style={{visibility:'hidden'}} controls id="test" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleMetadata} preload="metadata" ref={audioPlayerRef}>
                                <source ref={audioSrcRef} src={currentSongPlaying} type="audio/mpeg" />
                            </audio>
                            {/* <div className='test'>
                                <div className='track-line'></div>
                                <div className='track-thumb'></div>
                            </div> */}
                    </div>
                    {Object.keys(albumSelected).length === 0 ? <div className="inner-container">
                        <div className="greetings">Good Morning</div>
                        <div className="recent-playlist">
                            {albumData.map((album) => (
                            <div className='album-box' key={album.id} onClick={() => onSelectAlbum(album)}>
                                <img width={50} height={50} src={album.albumImgSm} alt={`${album.albumName}-album-pic`} />
                                <div>{album.albumName}</div>
                            </div>
                            ))}
                            {/* <div className='album-box'>
                                <img width={50} height={50} src={Golden} alt="Golden-album-pic" />
                                <div>Golden</div>
                            </div>
                            <div className='album-box'>
                                <img width={50} height={50} src={Indigo} alt="Indigo-album-pic" />
                                <div>Indigo</div>
                            </div>
                            <div className='album-box'>
                                <img width={50} height={50} src={Layover} alt="Layover-album-pic" />
                                <div>Layover</div>
                            </div>
                            <div className='album-box'>
                                <img width={50} height={50} src={Face} alt="Face-album-pic" />
                                <div>Face</div>
                            </div>
                            <div className='album-box'>
                                <img width={50} height={50} src={JackInTheBox} alt="Jack-in-the-box-album-pic" />
                                <div>Jack in the Box</div>
                            </div>
                            <div className='album-box'>
                                <img width={50} height={50} src={DDay} alt="Dday-album-pic" />
                                <div>D-Day</div>
                            </div> */}
                        </div>
                        
                    </div> : 
                    <div className="inner-container" style={{paddingTop:'20px', background:`${albumSelected.albumColor}`}}>
                        <div className='album-selected-section'>
                            <div className='back-icon' onClick={onHandleBackIcon}>{'<'}</div>
                            <div className='sub-selected-main-s'>
                            <div className='main-album-details'>
                                <img src={albumSelected.albumImg} alt="Golden-main-album" />
                                <div className='inner-album-details'>
                                    <div className='album-section-display'>
                                        <div className='type'>Album</div>
                                        <div className='name'>{albumSelected.albumName}</div>
                                    </div>
                                    <div className='a-brief-details'>
                                        <img src={albumSelected.albumImgXs} alt="artist-name" />
                                        <div className='ainame'>{albumSelected.artistName}</div>
                                        <div className='dot'>{'.'}</div>
                                        <div className='a-year'>{'2023'}</div>
                                        <div className='dot'>{'.'}</div>
                                        <div className='a-songs-count'>{`${albumSelected.songs.length} Songs`}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='selected-album-list-section' style={{background:`linear-gradient(${albumSelected.albumColor} 0%, rgb(26, 25, 25) 23%)`}}>
                                <div className='selected-album-list-c'>
                                    <div className='list-options-c'>
                                        <div>PlayAll</div>
                                        <div>List view</div>
                                    </div>
                                    <div className='song-list-section-table'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th style={{width:"40px"}}>#</th>
                                                    <th style={{width:"320px"}}>Title</th>
                                                    <th style={{textAlign:"right",width:"100px"}}>Plays</th>
                                                    <th style={{width:"120px"}}></th>
                                                    <th>Duration</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {albumSelected.songs.map((song: any, index: number) => (
                                                <tr key={song.id} onClick={() => onSongSelect(song)} className={`${isSongSelected === song.id ? 'song-seleted-row' : 'non-selected-row'}`}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div className='list-song-section'>
                                                            <div>{song.name}</div>
                                                            <div>{song.sungBy.join(", ")}</div>
                                                        </div>
                                                    </td>
                                                    <td style={{textAlign:"right"}}>{song.plays.toLocaleString("en-US")}</td>
                                                    <td></td>
                                                    <td className='song-list-duration'>3:21</td>
                                                </tr>))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className="side-right-bar">right</div>
            </div>
            <div className="current-song-container">
                <div className="song-details-section">
                    <img width={55} height={55} src={reactLogo} alt="React logo" />
                    <div className="song-details-inner">
                        <div className="s-name">It's You</div>
                        <div className="singer-name">Henry</div>
                    </div>
                </div>
                <div className="player-container">
                    <div className="player-icons-container">
                        <div>{'<<'}</div>
                        <div onClick={onPlayAudio}>Play</div>
                        <div>{'>>'}</div>
                    </div>
                    <div className="player-progress-bar-section">
                        <div className="curr-time-stage">{currTime}</div>
                        <div className="progress-bar">
                            <input type="range" ref={audioPlayerInpRef} onInput={onChangeAudio} onChange={onChangeAudio}  value={songProgressBar} />
                        </div>
                        <div className="song-time">{durationTime}</div>
                    </div>
                </div>
                <div className="player-right-bar-section">
                    <div className="sound-icon">S</div>
                    <div className="s-progress-bar">
                        {/* <input type="range" ref={audioVolInpRef} value={volumeVal} onInput={onChangeSound} onChange={onChangeSound} /> */}
                        <input type="range" style={{background:`linear-gradient(to right, #2dcf76 ${volumeVal}%, #808080 ${volumeVal}%)`}}ref={audioVolInpRef} value={volumeVal} onInput={onChangeSound} onChange={onChangeSound} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer;