# PhysioMitra UI Expansion & Symptom Database Enhancement

## Overview
Expand the PhysioMitra platform with improved UI layouts and a comprehensive physiotherapy symptom database with clinical terminology. This ensures users have access to accurate, clinically-relevant information for physiotherapy-related conditions.

## Requirements

### 1. About Us Page Layout Redesign
**User Story**: As a visitor, I want to see the team members displayed side-by-side with larger profile pictures so I can get a better sense of the team.

**Acceptance Criteria**:
- [ ] Team cards are displayed in a horizontal layout (side-by-side)
- [ ] Profile pictures are significantly larger (minimum 150x150px)
- [ ] Role badges are removed from team cards
- [ ] Team member name and degree are still visible
- [ ] Hover effects are maintained for interactivity
- [ ] Layout is responsive on mobile (stacks vertically if needed)
- [ ] Scrollable container is maintained for multiple team members

### 2. Symptom Checker Search Bar Simplification
**User Story**: As a user, I want a clean search interface focused only on symptom search without distracting options.

**Acceptance Criteria**:
- [ ] Search bar placeholder text reads "Search For Symptoms" only
- [ ] No "record" or other secondary options are visible
- [ ] Search functionality remains fully operational
- [ ] Clear button (X) is still available when text is entered
- [ ] Search works across both Physiotherapy and General symptoms

### 3. Comprehensive Physiotherapy Symptoms Database
**User Story**: As a physiotherapy patient, I want access to a complete list of physiotherapy-related symptoms with clinical terminology so I can accurately identify my condition.

**Acceptance Criteria**:
- [ ] All 22 original physiotherapy symptoms are retained
- [ ] 30+ advanced/clinical physiotherapy symptoms are added
- [ ] Each symptom includes clinical terminology in parentheses
- [ ] No duplicate symptoms exist in the database
- [ ] All symptoms are clinically accurate and verified
- [ ] Symptoms are organized logically (basic → advanced)
- [ ] Bayesian diagnosis engine works with expanded symptom list

### 4. Symptom Analyzer Reliability
**User Story**: As a user relying on the symptom analyzer, I want accurate Bayesian probability calculations so I can make informed health decisions.

**Acceptance Criteria**:
- [ ] Bayesian diagnosis engine is tested with expanded symptom list
- [ ] Probability calculations are mathematically sound
- [ ] Results are clinically reasonable and defensible
- [ ] Edge cases are handled gracefully
- [ ] Disclaimer about consulting healthcare professionals is prominent
- [ ] Self-care tips are medically accurate and evidence-based

## Physiotherapy Symptoms List

### Basic Physiotherapy Symptoms (22 existing)
1. Back Pain (Mechanical Back Pain / Lumbar Strain)
2. Lower Back Pain (Lumbar Pain / Lumbago)
3. Upper Back Pain (Thoracic Pain)
4. Neck Pain (Cervicalgia)
5. Shoulder Pain (Rotator Cuff Syndrome)
6. Knee Pain (Patellofemoral Pain Syndrome)
7. Hip Pain (Hip Joint Dysfunction)
8. Ankle / Foot Pain (Ankle Sprain / Plantar Fasciitis)
9. Wrist / Hand Pain (Carpal Tunnel Syndrome / Tendinitis)
10. Muscle Stiffness (Myofascial Tightness)
11. Joint Swelling (Joint Effusion / Inflammation)
12. Muscle Weakness (Muscle Atrophy / Neuromuscular Weakness)
13. Numbness / Tingling (Paresthesia)
14. Limited Range of Motion (ROM Restriction)
15. Poor Posture / Slouching (Postural Dysfunction)
16. Sciatica / Radiating Leg Pain (Lumbar Radiculopathy)
17. Sports / Exercise Injury (Soft Tissue Injury)
18. Balance / Coordination Issues (Proprioceptive Dysfunction)
19. Repetitive Strain (Repetitive Strain Injury – RSI)
20. Joint Pain (Arthralgia)
21. Leg Pain / Cramps (Muscle Cramp / Claudication)
22. Stiffness in Body (Generalized Rigidity)

### Advanced/Clinical Physiotherapy Symptoms (30+ new)
23. Difficulty Walking (Gait Abnormality)
24. Difficulty Standing for Long Time (Postural Intolerance)
25. Difficulty Sitting for Long Time (Postural Strain Syndrome)
26. Trouble Climbing Stairs (Functional Knee Dysfunction)
27. Difficulty Getting Up (Functional Mobility Impairment)
28. Reduced Flexibility (Soft Tissue Tightness)
29. Joint Locking (Mechanical Joint Locking)
30. Clicking / Popping in Joints (Crepitus)
31. Muscle Imbalance (Agonist–Antagonist Imbalance)
32. Muscle Tightness (Muscle Shortening)
33. Muscle Spasm (Involuntary Muscle Contraction)
34. Delayed Onset Muscle Soreness (DOMS)
35. Calf Pain While Walking (Intermittent Claudication)
36. Weak Grip Strength (Reduced Hand Grip Strength)
37. Difficulty Lifting Objects (Functional Weakness)
38. Burning Sensation (Neuropathic Pain)
39. Electric Shock-like Pain (Radicular Pain)
40. Radiating Arm Pain (Cervical Radiculopathy)
41. Pinched Nerve Sensation (Nerve Compression Syndrome)
42. Loss of Sensation (Sensory Deficit)
43. Foot Drop (Peroneal Nerve Palsy)
44. Hand Weakness (Motor Deficit)
45. Ligament Injury (Ligament Tear / Sprain)
46. Tendonitis (Tendinopathy)
47. Tennis Elbow (Lateral Epicondylitis)
48. Golfer's Elbow (Medial Epicondylitis)
49. Shin Splints (Medial Tibial Stress Syndrome)
50. Runner's Knee (Patellofemoral Syndrome)
51. Rotator Cuff Pain (Rotator Cuff Tear / Impingement)
52. Heel Pain (Plantar Fasciitis)
53. Forward Head Posture (Anterior Head Carriage)
54. Rounded Shoulders (Scapular Protraction)
55. Text Neck (Cervical Strain Syndrome)
56. Lower Back Pain While Sitting (Discogenic Pain)
57. Pain After Long Screen Time (Postural Strain)
58. Ergonomic Issues (Workplace Ergonomic Dysfunction)
59. Difficulty Taking Deep Breath (Reduced Chest Expansion)
60. Chest Tightness (Musculoskeletal Chest Pain)
61. Post-COVID Weakness (Post-Viral Fatigue Syndrome)
62. Reduced Lung Capacity (Restrictive Breathing Pattern)
63. Fatigue After Mild Activity (Reduced Exercise Tolerance)
64. Post-Surgery Stiffness (Post-Operative Joint Stiffness)
65. Post-Fracture Weakness (Post-Immobilization Weakness)
66. Swelling After Injury (Edema)
67. Loss of Function (Functional Impairment)
68. Difficulty Returning to Sport (Return-to-Play Deficit)
69. Balance Issues After Injury (Post-Injury Proprioceptive Loss)

## Technical Requirements

### Bayesian Diagnosis Engine
- [ ] Engine must handle 69+ physiotherapy symptoms
- [ ] Likelihoods for each condition must be updated/verified
- [ ] Prior probabilities must reflect clinical prevalence
- [ ] Results must be sorted by probability (highest first)
- [ ] Edge cases (no symptoms selected, single symptom) handled gracefully

### Self-Care Tips
- [ ] Tips must be added for all new symptoms
- [ ] Tips must be evidence-based and medically accurate
- [ ] Tips must include safety warnings where appropriate
- [ ] Tips must be actionable and practical

## Success Metrics
- All physiotherapy symptoms are clinically accurate
- Bayesian analyzer produces reasonable results
- UI is clean and user-friendly
- No duplicate symptoms in database
- Users can easily find relevant symptoms
