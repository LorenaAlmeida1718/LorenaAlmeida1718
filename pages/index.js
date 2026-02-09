import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Importa a conexão que você criou
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  const [status, setStatus] = useState('');

  const tiers = [
    { name: 'BASIC LICENSE', price: '$19.99', files: 'HQ MP3', accent: 'border-gray-800' },
    { name: 'WAV LICENSE', price: '$49.99', files: 'WAV + MP3', accent: 'border-purple-600' },
    { name: 'PREMIUM (STEMS)', price: '$99.99', files: 'ALL STEMS', accent: 'border-gray-800' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending inquiry...');
    const formData = new FormData(e.target);
    
    try {
      await addDoc(collection(db, "inquiries"), {
        artistName: formData.get('artistName'),
        email: formData.get('email'),
        beatName: formData.get('beatName'),
        license: formData.get('license'),
        status: "pending",
        createdAt: serverTimestamp()
      });
      setStatus('Inquiry sent! We will send your PayPal invoice within 24h.');
      e.target.reset();
    } catch (error) {
      console.error(error);
      setStatus('Submission Failed. Please try again.');
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans p-8">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-black tracking-tighter text-purple-600">DISSONANT BEATS</h1>
        <p className="text-gray-400 mt-2 text-lg uppercase tracking-widest">Premium Phonk & Trap Instrumentals</p>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {tiers.map((tier) => (
          <div key={tier.name} className={`bg-[#121212] p-8 rounded-2xl border-2 ${tier.accent} text-center transition-transform hover:scale-105`}>
            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
            <div className="text-purple-500 text-4xl font-black mb-4">{tier.price}</div>
            <p className="text-gray-400 text-xs mb-6">{tier.files}</p>
          </div>
        ))}
      </section>

      <section className="max-w-md mx-auto bg-[#121212] p-8 rounded-2xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center italic">PURCHASE INQUIRY</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="artistName" placeholder="Artist Name" required className="w-full p-3 bg-black rounded border border-gray-700 outline-none focus:border-purple-500" />
          <input name="email" type="email" placeholder="Your PayPal Email" required className="w-full p-3 bg-black rounded border border-gray-700 outline-none focus:border-purple-500" />
          <input name="beatName" placeholder="Beat Name" required className="w-full p-3 bg-black rounded border border-gray-700 outline-none focus:border-purple-500" />
          <select name="license" className="w-full p-3 bg-black rounded border border-gray-700 outline-none focus:border-purple-500">
            <option value="Basic - $19.99">Basic - $19.99</option>
            <option value="WAV - $49.99">WAV - $49.99</option>
            <option value="Premium - $99.99">Premium - $99.99</option>
          </select>
          <button type="submit" className="w-full py-4 bg-purple-700 hover:bg-purple-600 font-bold rounded transition-all">SEND REQUEST</button>
          {status && <p className="text-center text-sm text-purple-400 mt-4">{status}</p>}
        </form>
      </section>
    </div>
  );
}
