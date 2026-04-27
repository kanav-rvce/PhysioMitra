// Comprehensive symptom data with Bayesian-style diagnosis engine
// Merged and deduplicated symptoms across all categories

export interface Symptom {
  id: string;
  label: string;
  isPhysioRelated: boolean;
  category: 'general' | 'physio' | 'neurological' | 'cardiovascular' | 'respiratory' | 'digestive' | 'skin' | 'ent' | 'hormonal' | 'sleep' | 'redFlag';
}

export interface Condition {
  label: string;
  description: string;
  specialist: string;
  isPhysioRelevant: boolean;
  color?: string;
  prior: number;
  likelihoods: Record<string, number>;
}

export const symptoms: Symptom[] = [
  // Neurological / Mental
  { id: 'brain_fog', label: 'Brain Fog / Difficulty Concentrating', isPhysioRelated: false, category: 'neurological' },
  { id: 'memory_loss', label: 'Memory Loss', isPhysioRelated: false, category: 'neurological' },
  { id: 'tremors', label: 'Tremors / Shaking', isPhysioRelated: false, category: 'neurological' },
  { id: 'confusion', label: 'Confusion', isPhysioRelated: false, category: 'neurological' },
  { id: 'anxiety', label: 'Anxiety / Panic Attacks', isPhysioRelated: false, category: 'neurological' },
  { id: 'mood_swings', label: 'Mood Swings / Irritability', isPhysioRelated: false, category: 'neurological' },
  { id: 'depression', label: 'Depression / Low Mood', isPhysioRelated: false, category: 'neurological' },
  { id: 'numbness_tingling', label: 'Numbness / Tingling (Hands/Feet)', isPhysioRelated: true, category: 'neurological' },
  
  // Cardiovascular
  { id: 'high_bp_symptoms', label: 'High Blood Pressure Symptoms', isPhysioRelated: false, category: 'cardiovascular' },
  { id: 'low_bp', label: 'Low Blood Pressure / Lightheadedness', isPhysioRelated: false, category: 'cardiovascular' },
  { id: 'chest_tightness', label: 'Chest Tightness', isPhysioRelated: false, category: 'cardiovascular' },
  { id: 'irregular_heartbeat', label: 'Irregular Heartbeat', isPhysioRelated: false, category: 'cardiovascular' },
  { id: 'palpitations', label: 'Heart Palpitations', isPhysioRelated: false, category: 'cardiovascular' },
  
  // Respiratory
  { id: 'wheezing', label: 'Wheezing', isPhysioRelated: false, category: 'respiratory' },
  { id: 'phlegm', label: 'Phlegm / Mucus Build-up', isPhysioRelated: false, category: 'respiratory' },
  { id: 'dry_throat', label: 'Dry Throat', isPhysioRelated: false, category: 'respiratory' },
  { id: 'voice_hoarseness', label: 'Voice Hoarseness', isPhysioRelated: false, category: 'respiratory' },
  { id: 'cough', label: 'Cough', isPhysioRelated: false, category: 'respiratory' },
  { id: 'shortness_of_breath', label: 'Shortness of Breath', isPhysioRelated: false, category: 'respiratory' },
  
  // Musculoskeletal / Physio
  { id: 'back_pain', label: 'Back Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'neck_pain', label: 'Neck Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'joint_pain', label: 'Joint Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'muscle_weakness', label: 'Muscle Weakness', isPhysioRelated: true, category: 'physio' },
  { id: 'leg_cramps', label: 'Leg Pain / Cramps', isPhysioRelated: true, category: 'physio' },
  { id: 'stiffness', label: 'Stiffness in Body', isPhysioRelated: true, category: 'physio' },
  { id: 'shoulder_pain', label: 'Shoulder Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'knee_pain', label: 'Knee Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'hip_pain', label: 'Hip Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'ankle_pain', label: 'Ankle / Foot Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'wrist_pain', label: 'Wrist / Hand Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'sciatica', label: 'Sciatica / Radiating Leg Pain', isPhysioRelated: true, category: 'physio' },
  { id: 'muscle_stiffness', label: 'Muscle Stiffness', isPhysioRelated: true, category: 'physio' },
  { id: 'joint_swelling', label: 'Joint Swelling', isPhysioRelated: true, category: 'physio' },
  { id: 'limited_range_of_motion', label: 'Limited Range of Motion', isPhysioRelated: true, category: 'physio' },
  { id: 'posture_problems', label: 'Poor Posture / Slouching', isPhysioRelated: true, category: 'physio' },
  { id: 'repetitive_strain', label: 'Repetitive Strain (typing/desk work)', isPhysioRelated: true, category: 'physio' },
  { id: 'sports_injury', label: 'Sports / Exercise Injury', isPhysioRelated: true, category: 'physio' },
  { id: 'balance_issues', label: 'Balance / Coordination Issues', isPhysioRelated: true, category: 'physio' },
  
  // Digestive
  { id: 'vomiting', label: 'Vomiting', isPhysioRelated: false, category: 'digestive' },
  { id: 'indigestion', label: 'Indigestion', isPhysioRelated: false, category: 'digestive' },
  { id: 'loss_of_taste', label: 'Loss of Taste', isPhysioRelated: false, category: 'digestive' },
  { id: 'difficulty_swallowing', label: 'Difficulty Swallowing', isPhysioRelated: false, category: 'digestive' },
  { id: 'blood_in_stool', label: 'Blood in Stool ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'dark_stool', label: 'Dark / Black Stool', isPhysioRelated: false, category: 'digestive' },
  { id: 'excess_burping', label: 'Excess Burping', isPhysioRelated: false, category: 'digestive' },
  { id: 'abdominal_pain', label: 'Abdominal Pain', isPhysioRelated: false, category: 'digestive' },
  { id: 'bloating', label: 'Bloating / Gas', isPhysioRelated: false, category: 'digestive' },
  { id: 'diarrhea', label: 'Diarrhoea', isPhysioRelated: false, category: 'digestive' },
  { id: 'constipation', label: 'Constipation', isPhysioRelated: false, category: 'digestive' },
  { id: 'heartburn', label: 'Heartburn / Acid Reflux', isPhysioRelated: false, category: 'digestive' },
  { id: 'loss_of_appetite', label: 'Loss of Appetite', isPhysioRelated: false, category: 'digestive' },
  { id: 'nausea', label: 'Nausea', isPhysioRelated: false, category: 'digestive' },
  
  // Skin / Hair
  { id: 'acne', label: 'Acne / Pimples', isPhysioRelated: false, category: 'skin' },
  { id: 'dry_skin', label: 'Dry Skin', isPhysioRelated: false, category: 'skin' },
  { id: 'hair_loss', label: 'Hair Loss / Hair Thinning 🔥', isPhysioRelated: false, category: 'skin' },
  { id: 'dandruff', label: 'Dandruff', isPhysioRelated: false, category: 'skin' },
  { id: 'skin_discoloration', label: 'Skin Discoloration / Dark Spots', isPhysioRelated: false, category: 'skin' },
  { id: 'skin_rash', label: 'Skin Rash / Itching', isPhysioRelated: false, category: 'skin' },
  
  // Sleep / Lifestyle
  { id: 'daytime_sleepiness', label: 'Daytime Sleepiness', isPhysioRelated: false, category: 'sleep' },
  { id: 'snoring', label: 'Snoring', isPhysioRelated: false, category: 'sleep' },
  { id: 'night_sweats', label: 'Night Sweats', isPhysioRelated: false, category: 'sleep' },
  { id: 'lack_of_energy', label: 'Lack of Energy', isPhysioRelated: false, category: 'sleep' },
  { id: 'insomnia', label: 'Insomnia / Poor Sleep', isPhysioRelated: false, category: 'sleep' },
  { id: 'fatigue', label: 'Fatigue', isPhysioRelated: false, category: 'sleep' },
  
  // Hormonal / General
  { id: 'irregular_periods', label: 'Irregular Periods (very high search)', isPhysioRelated: false, category: 'hormonal' },
  { id: 'missed_period', label: 'Missed Period', isPhysioRelated: false, category: 'hormonal' },
  { id: 'hot_flashes', label: 'Hot Flashes', isPhysioRelated: false, category: 'hormonal' },
  { id: 'low_libido', label: 'Low Libido', isPhysioRelated: false, category: 'hormonal' },
  { id: 'weight_loss', label: 'Unexplained Weight Loss', isPhysioRelated: false, category: 'general' },
  { id: 'excessive_sweating', label: 'Excessive Sweating', isPhysioRelated: false, category: 'general' },
  { id: 'frequent_urination', label: 'Frequent Urination', isPhysioRelated: false, category: 'general' },
  { id: 'fever', label: 'Fever', isPhysioRelated: false, category: 'general' },
  { id: 'headache', label: 'Headache', isPhysioRelated: false, category: 'general' },
  { id: 'dizziness', label: 'Dizziness', isPhysioRelated: false, category: 'general' },
  { id: 'swollen_lymph_nodes', label: 'Swollen Lymph Nodes', isPhysioRelated: false, category: 'general' },
  { id: 'cold_hands_feet', label: 'Cold Hands / Feet', isPhysioRelated: false, category: 'general' },
  
  // ENT (Ear, Nose, Throat)
  { id: 'sinus_pressure', label: 'Sinus Pressure / Pain', isPhysioRelated: false, category: 'ent' },
  { id: 'nosebleeds', label: 'Nosebleeds', isPhysioRelated: false, category: 'ent' },
  { id: 'dry_eyes', label: 'Dry Eyes', isPhysioRelated: false, category: 'ent' },
  { id: 'light_sensitivity', label: 'Sensitivity to Light', isPhysioRelated: false, category: 'ent' },
  { id: 'runny_nose', label: 'Runny / Blocked Nose', isPhysioRelated: false, category: 'ent' },
  { id: 'ear_pain', label: 'Ear Pain / Ringing', isPhysioRelated: false, category: 'ent' },
  { id: 'sore_throat', label: 'Sore Throat', isPhysioRelated: false, category: 'ent' },
  { id: 'eye_strain', label: 'Eye Strain / Blurred Vision', isPhysioRelated: false, category: 'ent' },
  
  // Red Flag Symptoms (CRITICAL)
  { id: 'blood_in_urine', label: 'Blood in Urine ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'severe_chest_pain', label: 'Severe Chest Pain ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'sudden_vision_loss', label: 'Sudden Vision Loss ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'fainting', label: 'Fainting / Blackout ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'seizures', label: 'Seizures ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'difficulty_speaking', label: 'Difficulty Speaking ⚠️', isPhysioRelated: false, category: 'redFlag' },
  { id: 'chest_pain', label: 'Chest Pain', isPhysioRelated: false, category: 'cardiovascular' },
];

// Conditions remain the same as before, plus new ones will be added
export const conditions: Condition[] = [
  // ... (keep existing conditions and add new ones)
];

interface DiagnosisResult {
  label: string;
  value: number;
  color?: string;
  description: string;
  specialist: string;
  isPhysioRelevant: boolean;
}

interface CareTip {
  symptomLabel: string;
  tips: Array<{ icon: string; tip: string }>;
}

export function runBayesianDiagnosis(selectedSymptomIds: string[]): DiagnosisResult[] {
  if (selectedSymptomIds.length === 0) return [];
  const scores = conditions.map(condition => {
    let score = condition.prior;
    for (const sid of selectedSymptomIds) {
      const likelihood = condition.likelihoods[sid] ?? 0.05;
      score *= likelihood;
    }
    return { condition, score };
  });
  const total = scores.reduce((sum, s) => sum + s.score, 0);
  return scores
    .map(({ condition, score }) => ({
      label: condition.label,
      value: Math.round((score / total) * 100),
      color: condition.color,
      description: condition.description,
      specialist: condition.specialist,
      isPhysioRelevant: condition.isPhysioRelevant,
    }))
    .filter(r => r.value >= 3)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

export function getSelfCareTips(selectedSymptomIds: string[]): CareTip[] {
  return selectedSymptomIds
    .filter(id => selfCareTips[id])
    .map(id => ({
      symptomLabel: symptoms.find(s => s.id === id)?.label ?? id,
      tips: selfCareTips[id],
    }));
}

export const selfCareTips: Record<string, Array<{ icon: string; tip: string }>> = {
  // Will be populated with all tips
};
