const username = [
  "thejackbitt",
  "skydoesmc",
  "realBoeJiden",
  "jingleGang1337",
  "techfanatic2003",
  "legodude4103",
  "2077cipher",
  "mosesMFC",
  "momForReal2020",
  "realKeithOberman",
  "doomSlayer777",
  "johnRomera",
  "potato2003",
  "alikaly",
  "titanDaBest",
  "LisReal2401",
  "slappersOnly",
  "sugarKnight1997",
  "queenQueen1984",
  "nukacola",
  "X_x_tentacle_x_X",
];

const email = [
  "adventureseeker01@example.com",
  "adventureseeker01@sample.net",
  "adventureseeker01@demo.org",
  "techsavvy01@example.com",
  "techsavvy01@sample.net",
  "techsavvy01@demo.org",
  "fashionforward01@example.com",
  "fashionforward01@sample.net",
  "fashionforward01@demo.org",
  "melodymaker01@example.com",
  "melodymaker01@sample.net",
  "melodymaker01@demo.org",
  "literarygenius01@example.com",
  "literarygenius01@sample.net",
  "literarygenius01@demo.org",
  "culinaryconnoisseur01@example.com",
  "culinaryconnoisseur01@sample.net",
  "culinaryconnoisseur01@demo.org",
  "wellnesswarrior01@example.com",
  "wellnesswarrior01@sample.net",
  "wellnesswarrior01@demo.org",
];

const thought = [
  "Just conquered another city. Casual Tuesday.",
  "Why be a hero when you can rule the world? #VillainThoughts",
  "Plotting my next big move. Heroes, beware!",
  "In the lab creating something... destructive. #EvilGenius",
  "The world will soon be mine. Counting down the days.",
  "Heroes, always getting in the way of progress. #Annoyed",
  "Building an army of robots has its perks. #RobotOverlord",
  "Who needs friends when you have minions? #MinionLife",
  "Just stole the moon. What have you done today?",
  "My new lair is almost complete. Volcano views are the best.",
  "Why destroy the world when you can control it? #MasterPlan",
  "Finally cracked the code to unlimited power. #PowerHungry",
  "I don’t get mad. I get even... with interest. #Revenge",
  "Who said evil can't be stylish? #VillainFashion",
  "Ransom? I prefer the term 'forced investment'.",
  "My pet shark enjoys long swims around my enemies. #SharkTank",
  "Plot twist: The hero is the villain in my story. #Perspective",
  "Eco-friendly villainy: I recycle heroes. #GreenEvil",
  "I put the 'laughter' in 'slaughter'.",
  "Conquering the world, one nefarious plan at a time.",
  "Why settle for less when you can have world domination? #Ambition",
];

const reaction = [
  "Absolutely stunning!",
  "Great choice!",
  "Adventure time!",
  "Yum yum!",
  "Yes, please!",
  "Pure magic!",
  "Epic throwback!",
  "Mind = blown.",
  "Can't wait!",
  "So Zen.",
  "Playlist, please?",
  "Champion vibes!",
  "Globetrotter goals.",
  "Artistic genius!",
  "Pure joy!",
  "Future is here.",
  "Planet protector!",
  "Delicious success!",
  "Language wizard.",
  "Game on!",
  "Growth vibes.",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomUser() {
  const baseIndex = getRandomInt(username.length);
  const uniqueSuffix = Date.now() + getRandomInt(1000);
  return {
    username: `${username[baseIndex]}_${uniqueSuffix}`,
    email: `${email[baseIndex].split('@')[0]}_${uniqueSuffix}@${email[baseIndex].split('@')[1]}`
  };
}

function getRandomThoughts(n = 2) {
  let thoughts = [];
  for (let i = 0; i < n; i++) {
    const thoughtIndex = getRandomInt(thought.length);
    const reactions = [];
    for (let j = 0; j < 3; j++) {
      reactions.push(reaction[getRandomInt(reaction.length)]);
    }
    thoughts.push({
      thought: thought[thoughtIndex],
      reactions: reactions
    });
  }
  return thoughts;
}

function getRandomFriends(n = 1) {
  let friends = [];
  for (let i = 0; i < n; i++) {
    friends.push(username[getRandomInt(username.length)]);
  }
  return friends;
}

module.exports = { getRandomUser, getRandomThoughts, getRandomFriends };
