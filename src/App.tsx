import React, { useState, useEffect } from 'react';
import { Bird, Mail, CheckCircle2, XCircle } from 'lucide-react';

const allBirds = [
  {
    name: "Tufted Titmouse",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2024/01/Tufted-Titmouse.jpg",
    options: ["Carolina Chickadee", "Tufted Titmouse", "Oak Titmouse", "Bridled Titmouse"],
    correct: "Tufted Titmouse"
  },
  {
    name: "Anna's Hummingbird",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2022/07/Annas-Hummingbird-2.jpeg",
    options: ["Anna's Hummingbird", "Costa's Hummingbird", "Ruby-throated Hummingbird", "Calliope Hummingbird"],
    correct: "Anna's Hummingbird"
  },
  {
    name: "Lesser Goldfinch",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2024/04/Lesser-Goldfinch.jpeg",
    options: ["American Goldfinch", "Lawrence's Goldfinch", "Lesser Goldfinch", "Eurasian Siskin"],
    correct: "Lesser Goldfinch"
  },
  {
    name: "Eastern Bluebird",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2024/03/Eastern-Bluebird.jpeg",
    options: ["Eastern Bluebird", "Western Bluebird", "Mountain Bluebird", "Indigo Bunting"],
    correct: "Eastern Bluebird"
  },
  {
    name: "Black-capped Chickadee",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2024/05/Black-capped-Chickadee.jpeg",
    options: ["Carolina Chickadee", "Mountain Chickadee", "Black-capped Chickadee", "Boreal Chickadee"],
    correct: "Black-capped Chickadee"
  },
  {
    name: "Spotted Dove",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2022/11/Spotted-Dove.jpeg",
    options: ["Eurasian Collared-Dove", "Mourning Dove", "White-winged Dove", "Spotted Dove"],
    correct: "Spotted Dove"
  },
  {
    name: "House Finch",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2024/04/House-Finch.jpeg",
    options: ["House Finch", "Purple Finch", "Cassin's Finch", "Rosefinch"],
    correct: "House Finch"
  },
  {
    name: "Rhinoceros Hornbill",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2023/05/Rhinoceros-Hornbill.jpg",
    options: ["Great Hornbill", "Rhinoceros Hornbill", "Wreathed Hornbill", "Knobbed Hornbill"],
    correct: "Rhinoceros Hornbill"
  },
  {
    name: "Tawny Frogmouth",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2023/05/Tawny-Frogmouth.jpg",
    options: ["Eastern Whip-poor-will", "Common Potoo", "Tawny Frogmouth", "Great Nightjar"],
    correct: "Tawny Frogmouth"
  },
  {
    name: "Andean Cock-Of-The-Rock",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2023/05/Andean-Cock-Of-The-Rock.jpg",
    options: ["Andean Cock-Of-The-Rock", "Guianan Cock-of-the-Rock", "Scarlet Tanager", "Golden Pheasant"],
    correct: "Andean Cock-Of-The-Rock"
  },
  {
    name: "Magnificent Frigatebird",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2023/05/Magnificent-Frigatebird.jpg",
    options: ["Great Frigatebird", "Lesser Frigatebird", "Magnificent Frigatebird", "Christmas Island Frigatebird"],
    correct: "Magnificent Frigatebird"
  },
  {
    name: "Bee Hummingbird",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2023/05/Bee-Hummingbird.jpg",
    options: ["Bee Hummingbird", "Vervain Hummingbird", "Calliope Hummingbird", "Bumblebee Hummingbird"],
    correct: "Bee Hummingbird"
  },
  {
    name: "Northern Cardinal",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2024/03/Male-Northern-Cardinal-1.jpg",
    options: ["Vermilion Cardinal", "Pyrrhuloxia", "Northern Cardinal", "Summer Tanager"],
    correct: "Northern Cardinal"
  },
  {
    name: "Green Jay",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2022/11/Green-Jay.jpeg",
    options: ["Steller's Jay", "Green Jay", "Violaceous Jay", "Inca Jay"],
    correct: "Green Jay"
  },
  {
    name: "Blue Jay",
    image: "https://www.wildbirdscoop.com/wp-content/uploads/2022/06/Depositphotos_10659215_S.jpg",
    options: ["Blue Jay", "Scrub Jay", "Pinyon Jay", "Steller's Jay"],
    correct: "Blue Jay"
  }
];

function App() {
  const [quizBirds, setQuizBirds] = useState<typeof allBirds>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Randomly select 10 birds for the quiz
    const shuffled = [...allBirds].sort(() => Math.random() - 0.5);
    setQuizBirds(shuffled.slice(0, 10));
  }, []);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (answer === quizBirds[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < quizBirds.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowNewsletter(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/.netlify/functions/subscribe-mailerlite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          score: `${score}/${quizBirds.length}`
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.message || 'Subscription failed: Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error calling subscription function:', error);
      setSubmitError('Subscription failed: Could not reach server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = () => (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Question {currentQuestion + 1} of {quizBirds.length}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#2C5530] h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / quizBirds.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <img 
        src={quizBirds[currentQuestion]?.image} 
        alt="Bird to identify" 
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      
      <h2 className="text-xl font-serif mb-6">What bird is this?</h2>
      
      <div className="grid gap-4">
        {quizBirds[currentQuestion]?.options
          .sort(() => Math.random() - 0.5) // Randomize options order
          .map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="p-4 text-left border rounded-lg hover:bg-[#2C5530] hover:text-white transition-colors duration-200"
            >
              {option}
            </button>
          ))}
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <Bird className="w-16 h-16 text-[#2C5530] mx-auto mb-4" />
        <h2 className="text-2xl font-serif mb-2">Quiz Complete!</h2>
        <p className="text-xl mb-4">You got {score} out of {quizBirds.length} correct!</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {quizBirds.map((bird, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {answers[index] === bird.correct ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              {bird.name}
            </div>
          ))}
        </div>
      </div>

      {!submitted ? (
        <div className="bg-[#2C5530]/10 p-6 rounded-lg">
          <h3 className="text-xl font-serif mb-4">Want more bird watching tips?</h3>
          <p className="mb-4">Sign up for our newsletter to receive practical tips for attracting more birds to your yard!</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {submitError && (
              <p className="text-red-500 text-sm">{submitError}</p>
            )}
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 p-2 border rounded"
                required
                disabled={isSubmitting}
              />
              <button 
                type="submit"
                className="bg-[#2C5530] text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
                disabled={isSubmitting}
              >
                <Mail className="w-4 h-4" />
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center text-green-600">
          <CheckCircle2 className="w-12 h-12 mx-auto mb-2" />
          <p>Thanks for subscribing! Check your inbox soon.</p>
        </div>
      )}
    </div>
  );

  if (quizBirds.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      {!showNewsletter ? renderQuestion() : renderResults()}
    </div>
  );
}

export default App;