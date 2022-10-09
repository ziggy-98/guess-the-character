import { useUserDataState } from "../../context/context";
import React, { useEffect, useState } from "react";
import { AnswerResponse, Round, RoundResponse } from "server";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserDataApi } from "../../api/user-data";
import { QuestionBar } from "../2-molecules/question-bar";
import { CharacterImage } from "../1-atoms/character-image";
import { AnswerButtons } from "../2-molecules/answer-buttons";
import { TimerBar } from "../1-atoms/timer-bar";
import { ResultOverlay, ResultsProps } from "../2-molecules/result-overlay";
import { LoadingRoundOverlay } from "../2-molecules/loading-round-overlay";

export const RoundScreen = () => {
  const context = useUserDataState();
  const [roundData, setRoundData] = useState<Round>();
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(10000);
  const [roundStarted, setRoundStarted] = useState<boolean>(false);
  const [roundStartsIn, setRoundStartsIn] = useState<number>(3);
  const [answerCorrect, setAnswerCorrect] = useState<boolean>();
  const [resultsProps, setResultsProps] = useState<ResultsProps>();
  const { round } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let roundStartsInInterval: ReturnType<typeof setInterval>;
    let timeLeftInterval: ReturnType<typeof setInterval>;
    if (round && !dataFetched && context.uuid) {
      if (parseInt(round) === 11) {
        navigate("/game/results");
      } else {
        UserDataApi.getCurrentRound(context.uuid)
          .then((res) => {
            if (Object.keys(res).length > 0) {
              res = res as RoundResponse;
              if (res.roundNumber !== parseInt(round) - 1) {
                navigate(`/game/${res.roundNumber + 1}`);
              }
              setRoundData(res.round as Round);
              setDataFetched(true);
            } else {
              navigate("/game");
            }
          })
          .catch((err) => {
            console.log(err);
            navigate("/error");
          });
      }
    } else if (round && !dataFetched && !context.uuid) {
      navigate("/game");
    } else if (roundData && dataFetched && !roundStarted) {
      if (roundStartsIn === 0) {
        setTimeout(() => {
          setRoundStarted(true);
        }, 500);
      } else {
        roundStartsInInterval = setInterval(() => {
          setRoundStartsIn(roundStartsIn - 1);
        }, 1000);
      }
    } else if (
      roundData &&
      dataFetched &&
      roundStarted &&
      answerCorrect === undefined
    ) {
      if (timeLeft > 0) {
        timeLeftInterval = setInterval(() => {
          setTimeLeft(timeLeft - 300);
        }, 300);
      } else {
        const answer = roundData.options.find(
          (option) => option !== roundData.correctAnswer
        );
        chooseAnswer(answer);
      }
    }
    return () => {
      if (roundStartsInInterval !== undefined) {
        clearInterval(roundStartsInInterval);
      }
      if (timeLeftInterval !== undefined) {
        clearInterval(timeLeftInterval);
      }
    };
  }, [
    round,
    dataFetched,
    context.uuid,
    roundData,
    roundStarted,
    timeLeft,
    roundStartsIn,
  ]);

  const chooseAnswer = (answer: string) => {
    UserDataApi.submitAnswer(context.uuid, roundData, answer)
      .then((res) => {
        setAnswerCorrect((res as AnswerResponse).correct);
        const newResultsProps: ResultsProps = {
          correctAnswer: (res as AnswerResponse).correctAnswer,
          correct: (res as AnswerResponse).correct,
          nextRound: (res as AnswerResponse).nextRound,
          onClick: goToNextRound,
        };
        setResultsProps(newResultsProps);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  const goToNextRound = (nextRound: number) => {
    if (nextRound === 10) {
      navigate("/game/results");
    } else {
      navigate(`/game/${nextRound + 1}`);
      resetRound();
    }
  };

  const resetRound = () => {
    setRoundData(undefined);
    setTimeLeft(10000);
    setRoundStarted(false);
    setRoundStartsIn(3);
    setAnswerCorrect(undefined);
    setResultsProps(undefined);
    setDataFetched(false);
  };

  return (
    <div className="round-area">
      {!roundStarted && (
        <LoadingRoundOverlay
          loaded={roundData !== undefined}
          roundStartsIn={roundStartsIn}
        />
      )}
      {roundData && (
        <React.Fragment>
          <QuestionBar text="What film or tv show has this character been in?" />
          <div className="container">
            {roundData?.character.name && roundData?.character.image && (
              <CharacterImage
                url={roundData.character.image}
                alt={roundData.character.name}
              />
            )}
            <AnswerButtons
              correctAnswer={roundData.correctAnswer}
              answers={roundData.options}
              answerChosen={answerCorrect}
              onClick={chooseAnswer}
            />
            <TimerBar
              timeLeft={timeLeft}
              answerChosen={answerCorrect !== undefined}
            />
          </div>
        </React.Fragment>
      )}
      {answerCorrect !== undefined && <ResultOverlay {...resultsProps} />}
    </div>
  );
};
