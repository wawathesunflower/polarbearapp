/*
  # Create Affirmations System

  1. New Tables
    - `affirmations`
      - `id` (uuid, primary key)
      - `day` (integer, 1-31, unique)
      - `content` (text, the affirmation message)
      - `created_at` (timestamp)
    - `affirmation_unlocks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `day` (integer, 1-31)
      - `unlocked_at` (timestamp, when they first saw it)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Allow anyone to read affirmations
    - Users can only see their own unlocks
    - Users can only insert their own unlocks

  3. Data
    - Pre-populate 31 affirmations
*/

CREATE TABLE IF NOT EXISTS affirmations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day integer NOT NULL UNIQUE CHECK (day >= 1 AND day <= 31),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS affirmation_unlocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day integer NOT NULL CHECK (day >= 1 AND day <= 31),
  unlocked_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, day)
);

ALTER TABLE affirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE affirmation_unlocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affirmations are readable by everyone"
  ON affirmations FOR SELECT
  USING (true);

CREATE POLICY "Users can read own unlocks"
  ON affirmation_unlocks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own unlocks"
  ON affirmation_unlocks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

INSERT INTO affirmations (day, content) VALUES
(1, 'You are a beautiful blessing in my life, and I can only but be thankful to God for you in each moment.'),
(2, 'When the Bible talked about every good and perfect gift coming from God, he made sure that I experience it with you.'),
(3, 'Today is a gift. Make it count, not for perfection, but for progress in your life. Enjoy each moment and make the most of it mi amor.'),
(4, 'I love you my fluffy marshmallow Polar Bear, you make each moment count with your silly jokes!'),
(5, 'Growth looks like showing up, even when it is hard. You are doing it beautifully love and I thank you for showing up consistently.'),
(6, 'Thank you for loving me as loudly as you always do. I hope you know and see that I love you too baby.'),
(7, 'Take a moment and breathe my love, it may have been a tough day, but hey, it is not a bad life. Tomorrow, you will rise to conquer a new day mi amor.'),
(8, 'I am proud of you for taking time to grow and be real with yourself. Facing yourself and choosing to allow God to help you grow along the way.'),
(9, 'Your story is not over. The best chapters are still being written by God for your life.'),
(10, 'God has a plan for a FUTURE, and a HOPE for you. Do not let the weights of bad days blind you from the blessings God has for you.'),
(11, 'May God abundantly grace you with wisdom, knowledge and understanding so that you may shine your light brighter in each room you enter. You are awesome my love.'),
(12, 'Pee Pee Sniper, you are an amazing boyfriend, now how about you send your baby girl a cute photo to make her day, today...wink wink'),
(13, 'You have already overcome more than you realize. Trust that pattern of discipline in God and committing to the journey with Him.'),
(14, 'I love celebrating your wins and also getting to experience your joy and bluppiness in each moment. You are worth all the hype I give you baby and I will always cheer you.'),
(15, 'Todays affirmations for you: I will not burn my popcorn lol. Yeah, I did that baby. MUAHAHAHAAAAA.'),
(16, 'I hope you know that "Je t’aime" doesn’t even cover half of how I feel about you. The rest will be unfloded progressively as we keep growing in live together.'),
(17, 'I am going to need you to keep that Raid handy, because you’re looking way too good today. No farts, just the little raid spray bottle so that the weirdos do not bother you, lol.'),
(18, 'Baby, consider this your daily reminder to stay hydrated and stay mine.'),
(19, 'Gratitude amplifies joy. Look for one thing today that fills your heart, and write it down my love.'),
(20, 'You’re my favorite person to do absolutely everything (and nothing) with baby.'),
(21, 'Fear is not your portion. God has given you a spirit of Power and of a sound mind. Go live out your best day yet my love.'),
(22, 'I feel so safe knowing I have you by my side through everything. You have shown me what choosing someone can look like and I am glad I have learnt it anew with you.'),
(23, 'Every time I think about how you showed up for me, it reminds me that you are one of the greatest gifts I have ever received, and I am so lucky to call you mine.'),
(24, 'Just a little reminder as you go about your day: you are deeply loved, incredibly appreciated, and you occupy every single one of my favorite thoughts baby.'),
(25, 'I hope your breakfast is as good as you are and that your day is full of peace, because a soul as beautiful as yours deserves nothing but the best.'),
(26, 'You’re my favorite person to laugh with, play with, and be ridiculous with, and I’m honestly so glad God gave me the funniest and a handsome man at that!'),
(27, 'You are not just my boyfriend; you are a beautiful light that makes every single day brighter, and I am forever grateful to God for the way you lead and love me.'),
(28, 'You have such a beautiful way of being both my strongest protector and my softest place to land, and I’m just so incredibly blessed that God chose me to be the one by your side in this season.'),
(29, 'You are braver than you believe and stronger than you think.'),
(30, 'Every time I think about how lucky I am, I realize it is not luck at all—it’s just God being incredibly kind to me by putting a "chico bueno" like you in my life to have random and fun adventures with.'),
(31, 'You are loved. Not because of what you do, but because of who you are baby. And Wawa loves you so very much.')
ON CONFLICT (day) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_affirmation_unlocks_user_id ON affirmation_unlocks(user_id);
CREATE INDEX IF NOT EXISTS idx_affirmation_unlocks_day ON affirmation_unlocks(day);
