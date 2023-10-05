import React from 'react'
import "../assets/css/chat.css"
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';



const BotMessage = () => {
    return (
        <div className="cc-lmc-bot-container">
            <div className="cc-lmc-bc-body">
                <p>
                    Yes, Stockfish, one of the strongest chess engines in the world, has been defeated by other engines and, on rare occasions, by top human players under specific conditions. Here are some notable instances:

                    AlphaZero: In December 2017, Google's DeepMind announced that their AI, AlphaZero, defeated Stockfish in a 100-game match. AlphaZero won 28 games and drew the remaining 72, with no losses. It's worth noting that AlphaZero had a unique approach to playing chess, as it taught itself from scratch using deep neural networks and self-play, without relying on traditional chess engines or opening databases.

                    LCZero (Leela Chess Zero): LCZero, inspired by AlphaZero's methods but developed by the community, has also defeated Stockfish in various matches and tournaments. Like AlphaZero, LCZero uses neural networks and self-play to learn.

                    Top Human Players: While Stockfish typically outperforms even the best human players in direct matches, there have been instances in simultaneous exhibitions or specific conditions where top grandmasters have managed to defeat Stockfish. However, in standard conditions and time controls, Stockfish is generally superior to human players.

                    Other Engines: Over the years, Stockfish has participated in many computer chess tournaments against other top engines like Komodo, Houdini, and Rybka. While Stockfish often performs exceptionally well, it has faced defeats against these engines in some games.</p>
                <div className="cc-lmc-bc-actions">
                    <div className="cc-lmc-bc-actions-left">
                        <div className='cc-lmc-bc-actions-icon-holder'>
                            <ContentCopyOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                        <div className='cc-lmc-bc-actions-icon-holder'>
                            <ThumbUpOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                        <div className='cc-lmc-bc-actions-icon-holder'>
                            <ThumbDownOffAltOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                    </div>
                    <div className="cc-lmc-bc-actions-right">2 hours ago</div>
                </div>
            </div>

        </div>
    )
}

export default BotMessage