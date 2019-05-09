import React, { Component } from "react";
import ReactDOM from "react-dom";
import IntroFirst from "./IntroFirst";

class Intro extends Component {
  constructor(props) {
    super(props);
    this.heroRef = React.createRef();
    this.state = {
      heroanim: "no",

      fadeon1: "no",
      fadeon2: "no",
      fadeon3: "no",
      fadeon4: "no",
      fadeon5: "no",
      fadeTimeOut: null,
      rightarr: null,
      leftarr: null,
      initialarrow: "yes",
      jdq: [
        <div className="jondanyinnerquote">
          {
            ' "It’s not easy being drunk all the time. If it were easy, everyone would do it." '
          }
        </div>,
        <div className="jondanyinnerquote">
          {
            '"Let me tell you something, Bastard. Never forget what you are, the rest of the world will not. Wear it like armor and it can never be used to hurt you. "'
          }
        </div>,
        <div className="jondanyinnerquote">
          {
            '"When you tear out a man’s tongue, you are not providing him a liar, you’re only telling the world that you fear what he might say. "'
          }
        </div>
      ],
      jdq2: [
        <div className="jondanyinnerquote">
          {
            ' "Power resides where men believe it resides. It’s a trick, a shadow on the wall. And a very small man can cast a very large shadow" '
          }
        </div>,
        <div className="jondanyinnerquote">
          {
            '"In a room sit three great men, a king, a priest, and a rich man. Between them stands a common sellsword. Each great man bids the sellsword slay the other two. Who lives, who dies? Power resides where men believe it resides. It’s a trick, a shadow on the wall, and a very small man can cast a very large shadow. "'
          }
        </div>
      ],
      jdq3: [
        <div className="jondanyinnerquote">
          {
            ' "A man with no motive is a man no one suspects. Always keep your foes confused." '
          }
        </div>
      ],
      dbgback: [
        {
          transform: "translate3d(0px, 0px, 0px)",
          opacity: 1,
          background:
            "url(https://www.thecapitol.pn/img/home-diamond-black-1.png)"
        },
        {
          transform: "translate3d(0px, 0px, 0px)",
          opacity: 1,
          background:
            "url(https://www.thecapitol.pn/img/home-diamond-black-2.png)"
        },
        {
          transform: "translate3d(0px, 0px, 0px)",
          opacity: 1,
          background:
            "url(https://www.thecapitol.pn/img/home-diamond-black-3.png)"
        },
        {
          transform: "translate3d(0px, 0px, 0px)",
          opacity: 1,
          background:
            "url(https://www.thecapitol.pn/img/home-diamond-black-4.png)"
        }
      ],
      herochoice: null,
      dbgcounter: 0,
      edit: "no"
    };

    this.twiquotedivs = [];
    this.twiquotes = [
      `"Death is Peaceful, Life is Harder" -Bella`,
      `"Twilight, again. Another ending. No matter how perfect the day is, it always has to end." -Bella`,
      `"Darkness is so predictable, don't you think?"" -Edward`,
      `"When life offers you a dream so far beyond any of your expectations, it’s not reasonable to grieve when it comes to an end." -Bella`,
      `"I like the night. Without the dark, we'd never see the stars......"  -Bella`,
      `"What if I'm not a superhero. What if I'm the bad guy?" -Edward `,
      `"Thats the beautiful thing about being human: Things change."  -Edward`
    ];
  }

  componentDidMount = () => {
    this.setState({ dbgcounter: 0, diainter: diainter });

    setTimeout(() => {
      this.startup();
    }, 500);
    this.startup();

    let diainter = setInterval(() => {
      if (this.state.herochoice === "katniss") {
        if (this.state.dbgcounter === 3) {
          this.setState({ dbgcounter: 0 });
        } else {
          this.setState({ dbgcounter: this.state.dbgcounter + 1 });
        }
      }
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.state.diainter);
  };

  startup = () => {
    //the class we want to observe for visibility changes, scrolling for animation.
    let adBox = document.querySelector(".heroSection");

    //checks if page was tabbed out or hidden. separate from intersectionobserver
    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
      false
    );
    //intersectionobserveroptions. root is highest element you want to compare to. threshhold is % visibility of element you're comparing to root. 'callback activated when 50% visibility.'
    let observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: [0.7]
    };

    //create new intersection observer
    let adObserver = new IntersectionObserver(
      this.intersectionCallback,
      observerOptions
    );

    //call it.
    adObserver.observe(adBox);
  };

  handleVisibilityChange = () => {
    if (document.hidden) {
      //changeclass to no animate through setstate
    } else {
      //changeclass to animate
    }
  };

  intersectionCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.setState({ heroanim: "yes" }, () => {
          setTimeout(() => {
            this.setState({ showimg: "yes" });
          }, 1000);
        });
      } else {
        this.setState({ heroanim: "no", picclicked: "no", showimg: "no" });
      }
    });
  };

  randomQuotes = () => {
    let quotes = [
      '"It does not do to dwell on dreams and forget to live."   ~Albus Dumbledore',
      '"It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends." ~Albus Dumbledore',
      '"Fear of a name only increases fear of the thing itself."  ~Hermione ',
      '"It is our choices, Harry, that show what we truly are, far more than our abilities.” ~Albus Dumbledore',
      '"If you want to know what a man’s like, take a good look at how he treats his inferiors, not his equals." ~Sirius Black'
    ];
    /*
    function randomPos(){
      //random margin top, right.
      let margintop = Math.floor(Math.random() * 30) + 1;
      let marginleft = Math.floor(Math.random() * 50) + 1;
      console.log(margintop,marginleft)

      return [margintop,marginleft]
    }
*/

    let quotesdiv = quotes.map((quote, index) => {
      /*
      let margins = randomPos();
      let mx = margins[0]+"em";
      let my = margins[1]+"em";
      let both = "translate(" + mx + "," + my + ")";
      console.log(both)
       let style = {transform:both}
*/
      let fadetype = 0;
      switch (index + 1) {
        case 1:
          fadetype = 1;
          break;
        case 2:
          fadetype = 2;
          break;
        case 3:
          fadetype = 3;
          break;
        case 4:
          fadetype = 4;
          break;
        case 5:
          fadetype = 5;
          break;
      }

      let fade = "fadeon" + fadetype;
      let classN = "invisperm";
      if (this.state[fade] === "yes") {
        classN = "invis";
      }

      return (
        <div key={index} className={classN}>
          {quote}
        </div>
      );
    });

    function checkPrev(state, props) {
      if (state.quotesdiv) {
        let same = "yes";

        for (let i = 0; i < 5; i++) {
          if (
            state.quotesdiv[i].props.className !== quotesdiv[i].props.className
          ) {
            same = "no";
          }
        }

        if (same === "yes") {
          return null;
        }
      }

      return {
        quotesdiv: quotesdiv
      };
    }

    if (this.state.fadeTimeOut !== "off") {
      setTimeout(() => {
        this.setState({
          fadeon1: "yes"
        });
      }, 1000);

      setTimeout(() => {
        this.setState({
          fadeon2: "yes"
        });
      }, 2000);

      setTimeout(() => {
        this.setState({
          fadeon3: "yes"
        });
      }, 3000);

      setTimeout(() => {
        this.setState({
          fadeon4: "yes"
        });
      }, 4000);

      setTimeout(() => {
        this.setState(
          {
            fadeon5: "yes"
          },
          () => {
            this.setState({ fadeTimeOut: "off" });
          }
        );
      }, 5000);
    }

    this.setState(checkPrev);
  };

  handlePicClicks = e => {
    let id = e.currentTarget.id;
    switch (id) {
      case "harry":
        this.setState({
          herochoice: "harry",
          rightarr: "jondany",
          leftarr: "twilight"
        });
        break;
      case "jondany":
        this.setState({
          herochoice: "jondany",
          rightarr: "katniss",
          leftarr: "harry"
        });
        break;
      case "katniss":
        this.setState({
          herochoice: "katniss",
          rightarr: "twilight",
          leftarr: "jondany"
        });
        break;
      case "twilight":
        this.setState({
          herochoice: "twilight",
          rightarr: "harry",
          leftarr: "katniss"
        });
        break;
    }

    this.setState({ picclicked: "yes" }, () => {
      if (this.state.herochoice == "jondany") {
        setTimeout(() => {
          this.setState({ jondanyvidon: "yes" });
        }, 1000);
      }

      if (this.state.herochoice != "twilight") {
        this.setState({ edit: "no" }, () => {
          this.setTwilightQuotes();
        });
      }
    });
  };

  heroButtonClick = () => {
    this.setState(
      {
        jondanyvidon: "no",
        edit: "no",
        showimg: "yes",
        heroanim: "yes",
        picclicked: "no",
        fadeon1: false,
        fadeon2: false,
        fadeon3: false,
        fadeon4: false,
        fadeon5: false,
        fadeTimeOut: null
      },
      () => {
        this.startup();
        this.setTwilightQuotes();
      }
    );
  };

  jondanyquoteClick = e => {
    let id = e.currentTarget.id;
    switch (id) {
      case "jdb1":
        this.setState({ jdb1: "yes", jdb2: "no", jdb3: "no" }, () => {
          setTimeout(() => {
            this.setState({ jdb1: "no" });
          }, 10000);
        });
        break;
      case "jdb2":
        this.setState({ jdb2: "yes", jdb1: "no", jdb3: "no" }, () => {
          setTimeout(() => {
            this.setState({ jdb2: "no" });
          }, 10000);
        });
        break;
      case "jdb3":
        this.setState({ jdb3: "yes", jdb1: "no", jdb2: "no" }, () => {
          setTimeout(() => {
            this.setState({ jdb3: "no" });
          }, 10000);
        });
        break;
    }
  };

  pcrightArrClick = () => {
    let rightarr = this.state.rightarr;

    if (this.state.initialarrow != "yes") {
      switch (rightarr) {
        case "harry":
          this.setState({
            herochoice: "harry",
            rightarr: "jondany",
            leftarr: "twilight"
          });
          break;
        case "jondany":
          this.setState(
            { herochoice: "jondany", rightarr: "katniss", leftarr: "harry" },
            () => {
              if (this.state.herochoice === "jondany") {
                this.setState({ jondanyvidon: "yes" });
              }
            }
          );
          break;
        case "katniss":
          this.setState({
            herochoice: "katniss",
            rightarr: "twilight",
            leftarr: "jondany"
          });
          break;
        case "twilight":
          this.setState(
            { herochoice: "twilight", rightarr: "harry", leftarr: "katniss" },
            () => {}
          );
          break;
      }

      this.setState({ edit: "no" }, () => {
        this.setTwilightQuotes();
      });
    } else {
      this.setState({ herochoice: rightarr, initialarrow: "no" });
    }
  };

  pcleftArrClick = () => {
    let leftarr = this.state.leftarr;

    if (this.state.initialarrow != "yes") {
      switch (leftarr) {
        case "harry":
          this.setState({
            herochoice: "harry",
            rightarr: "jondany",
            leftarr: "twilight"
          });
          break;
        case "jondany":
          this.setState(
            { herochoice: "jondany", rightarr: "katniss", leftarr: "harry" },
            () => {
              if (this.state.herochoice === "jondany") {
                this.setState({ jondanyvidon: "yes" });
              }
            }
          );
          break;
        case "katniss":
          this.setState({
            herochoice: "katniss",
            rightarr: "twilight",
            leftarr: "jondany"
          });
          break;
        case "twilight":
          this.setState({
            herochoice: "twilight",
            rightarr: "harry",
            leftarr: "katniss"
          });
          break;
      }
      this.setState({ edit: "no" }, () => {
        this.setTwilightQuotes();
      });
    } else {
      this.setState({ herochoice: leftarr, initialarrow: "no" });
    }
  };

  dbgstyle = () => {
    this.dbinterval = setInterval(() => {
      if (this.state.dbgcounter === 3) {
        this.setState({ dbgcounter: 0 }, () => {
          return {
            transform: "translate3d(0px, 0px, 0px)",
            opacity: 1,
            background: this.state.dbgback[this.state.dbgcounter]
          };
        });
      } else {
        this.setState({ dbgcounter: this.state.dbg + 1 }, () => {
          return {
            transform: "translate3d(0px, 0px, 0px)",
            opacity: 1,
            background: this.state.dbgback[this.state.dbgcounter]
          };
        });
      }
    }, 1000);
  };

  randomPos = () => {
    //random margin top, right.
    let x = Math.floor(Math.random() * 20) + 1;
    let y = Math.floor(Math.random() * 10) + 1;
    let trans = "translate(" + x + "em," + y + "em) !important";

    return { trans };
  };

  setTwilightQuotes = edit => {
    let tempdivs = [];

    const createQuotes = () => {
      for (let i = 0; i < 6; i++) {
        let quote = this.twiquotes[i];
        tempdivs.push(
          <div
            key={i}
            id={i}
            onClick={this.appleClick}
            className={"twilightQuote" + i}
          >
            {quote}
          </div>
        );
      }
    };

    if (edit === "yes") {
      return this.twiquotedivs;
    } else {
      createQuotes();
    }

    this.twiquotedivs = [];
    this.twiquotedivs = this.twiquotedivs.concat(tempdivs);
    return this.twiquotedivs;
  };

  appleClick = e => {
    let id = e.currentTarget.id;
    let twiquotedivs = this.twiquotedivs;

    for (let i = 0; i < twiquotedivs.length; i++) {
      if (twiquotedivs[i].props.id == id) {
        twiquotedivs.splice(i, 1);
      }
    }

    this.twiquotedivs = [];
    this.twiquotedivs = this.twiquotedivs.concat(twiquotedivs);

    this.setState({ edit: "yes" });
  };

  render() {
    return (
      <div className="introCont">
        <div className="introFirstSection"> 
          <IntroFirst/>
        </div>
        <div className="heroSection">
          {this.state.picclicked != "yes" ? <div className="addQuoteText">Be Inspired By Some Of your Favorites!</div> : null}
          {this.state.picclicked != "yes" ? (
            <div className="heroGallery">
              <div
                id="harry"
                className={
                  this.state.heroanim === "yes"
                    ? "heroes slide-up"
                    : "heroeshide"
                }
                onClick={this.handlePicClicks}
              >
                <div className="coverHero">Harry Potter</div>
              </div>
              <div
                id="jondany"
                className={
                  this.state.heroanim === "yes"
                    ? "heroes slide-down"
                    : "heroeshide"
                }
                onClick={this.handlePicClicks}
              >
                <div className="coverHero">Game of Thrones</div>
              </div>
              <div
                id="katniss"
                className={
                  this.state.heroanim === "yes"
                    ? "heroes slide-up"
                    : "heroeshide"
                }
                onClick={this.handlePicClicks}
              >
                <div className="coverHero">The Hunger Games</div>
              </div>
              <div
                id="twilight"
                className={
                  this.state.heroanim === "yes"
                    ? "heroes slide-down"
                    : "heroeshide"
                }
                onClick={this.handlePicClicks}
              >
                <div className="coverHero">Twilight</div>
              </div>
            </div>
          ) : null}

          {this.state.picclicked === "yes" ? (
            <div className="picClickCont">
              <div className="pcrightArr" onClick={this.pcleftArrClick} />
              <div className="pcleftArr" onClick={this.pcrightArrClick} />
              {this.state.herochoice === "harry" ? (
                <div className="parentFades">
                  {this.randomQuotes()} {this.state.quotesdiv}
                </div>
              ) : null}
              {this.state.herochoice === "jondany" ? (
                <div className="parentJonDany">
                  <div className="jondanylinkgroup">
                    <div
                      className="jondanybutton1"
                      id="jdb1"
                      onClick={this.jondanyquoteClick}
                    >
                      Tyrion Quotes
                    </div>
                    <div
                      className="jondanybutton1"
                      id="jdb2"
                      onClick={this.jondanyquoteClick}
                    >
                      Varys Quotes
                    </div>
                    <div
                      className="jondanybutton1"
                      id="jdb3"
                      onClick={this.jondanyquoteClick}
                    >
                      LittleFinger Quotes
                    </div>
                  </div>
                  <div
                    className={
                      this.state.jdb1 === "yes" ? "jondanyshowquote" : ""
                    }
                  >
                    {this.state.jdb1 === "yes" ? this.state.jdq : null}
                  </div>
                  <div
                    className={
                      this.state.jdb2 === "yes" ? "jondanyshowquote" : ""
                    }
                  >
                    {this.state.jdb2 === "yes" ? this.state.jdq2 : null}
                  </div>
                  <div
                    className={
                      this.state.jdb3 === "yes" ? "jondanyshowquote" : ""
                    }
                  >
                    {this.state.jdb3 === "yes" ? this.state.jdq3 : null}
                  </div>

                  <div
                    className={
                      this.state.jondanyvidon != "yes"
                        ? "invisperm"
                        : "jondanyvid"
                    }
                  >
                    <div className="jondanyoverlay" />
                    <iframe
                      className="delayFrame"
                      id="existing-iframe-example"
                      width="100%"
                      height="100%"
                      src="https://www.youtube-nocookie.com/embed/kKEw81CFkcs?autoplay=1&mute=1&enablejsapi=1&controls=0&loop=1&playlist=GRonxog5mb"
                      frameBorder="0"
                    />
                  </div>
                  <div className="jondanyscript" />
                </div>
              ) : null}
              {this.state.herochoice === "katniss" ? (
                <div className="parentKatniss">
                  <div className="diacont">
                    <div
                      className="diamondbg"
                      style={this.state.dbgback[this.state.dbgcounter]}
                    >
                      <div className="marquee">
                        "Miss Everdeen, it is the things we love most that
                        destroy us." -President Snow
                      </div>
                    </div>
                    <svg
                      className="home-diamond"
                      style={{
                        transformOrigin: "20em 120px 0px",
                        opacity: 0.8,
                        transform: "matrix(0.5, 0, 0, 0.5, 0, 0)"
                      }}
                    >
                      <path
                        d={"M0 480 L320 0 L640 480 L320 1440 L0 480"}
                        fill={"none"}
                        stroke="#efefef"
                        style={{
                          strokeWidth: 1,
                          transform: "translate3d(0px, 0px, 0px)",
                          opacity: 1
                        }}
                      />
                    </svg>
                  </div>
                  <div className="diacont2">
                    <div
                      className="diamondbg2"
                      style={this.state.dbgback[this.state.dbgcounter]}
                    >
                      <div className="marquee2">
                        {" "}
                        "Hope. It is the only thing stronger than fear. A little
                        hope is effective. A lot of hope is dangerous."
                        -President Snow
                      </div>
                    </div>
                    <svg
                      className="home-diamond2"
                      style={{
                        transformOrigin: "20em 120px 0px",
                        opacity: 0.8,
                        transform: "matrix(0.5, 0, 0, 0.5, 0, 0)"
                      }}
                    >
                      <path
                        d={"M0 480 L320 0 L640 480 L320 1440 L0 480"}
                        fill={"none"}
                        stroke="#efefef"
                        style={{
                          strokeWidth: 1,
                          transform: "translate3d(0px, 0px, 0px)",
                          opacity: 1
                        }}
                      />
                    </svg>
                  </div>
                </div>
              ) : null}
              {this.state.herochoice === "twilight" ? (
                <div className="parentTwilight">
                  {this.setTwilightQuotes(this.state.edit)}
                  <img
                    className="trunkimg"
                    src="https://i.imgur.com/EmxOoUt.png"
                  />

                  <img
                    className="moonimg"
                    src="https://i.imgur.com/QyHfkGT.jpg"
                  />
                  <img
                    className="moonimg2"
                    src="https://i.imgur.com/9GcAEAV.png"
                  />
                  <img
                    className="moonimg3"
                    src="https://i.imgur.com/Cme5JAb.png"
                  />
                  <img
                    className="moonimg4"
                    src="https://i.imgur.com/JgNgci4.png"
                  />
                  <img
                    className="moonimg5"
                    src="https://i.imgur.com/qMlX5u9.png"
                  />
                </div>
              ) : null}
              <div
                className={
                  this.state.herochoice === "katniss"
                    ? "heroButtonAbs"
                    : "heroButton"
                }
                onClick={this.heroButtonClick}
              >
                <span className="button__mask" />
                <span className="button__text">Back to Select </span>
                <span className="button__text button__text--bis">
                  Back to Select
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Intro;