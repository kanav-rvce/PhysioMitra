# PhysioMitra UI Expansion & Symptom Database - Design Document

## Architecture Overview

### 1. About Us Page - Horizontal Team Layout

**Current State**: Vertical stack of rectangular cards with role badges
**Target State**: Horizontal side-by-side layout with larger images, no role badges

**Design Changes**:
```
Layout: Horizontal flex container (flex-direction: row)
Image Size: 180x180px (increased from 120x120px)
Card Structure:
  - Image on left (larger, more prominent)
  - Name and degree on right (minimal text)
  - No role badges
  - Hover effects maintained
  - Responsive: stacks vertically on mobile (< 768px)
```

**Component Structure**:
- Team cards use `display: flex` with `flex-direction: row`
- Image container: 180x180px with colored border
- Content container: flex-grow to fill remaining space
- Scrollable wrapper: `maxHeight: 600px, overflowY: auto`

### 2. Symptom Checker - Search Bar Simplification

**Current State**: Search bar with potential for multiple options
**Target State**: Clean search-only interface

**Design Changes**:
```
Search Bar:
  - Placeholder: "Search For Symptoms"
  - Icon: Search icon on left
  - Clear button: X icon on right (when text entered)
  - No secondary options or buttons
  - Styling: Consistent with existing card design
```

**Implementation**:
- Remove any "record" or secondary action buttons
- Keep search input clean and focused
- Maintain existing search functionality
- Clear button remains for UX convenience

### 3. Physiotherapy Symptoms Database Expansion

**Current Structure**:
```typescript
export interface Symptom {
  id: string;
  label: string;
  isPhysioRelated: boolean;
}
```

**Expanded Structure** (same interface, more data):
- 22 basic symptoms (existing)
- 47 advanced/clinical symptoms (new)
- Total: 69 physiotherapy-related symptoms

**Organization**:
```
Physiotherapy-Related Symptoms (69 total)
├── Basic Symptoms (22)
│   ├── Back Pain (Mechanical Back Pain / Lumbar Strain)
│   ├── Lower Back Pain (Lumbar Pain / Lumbago)
│   └── ... (20 more)
└── Advanced/Clinical Symptoms (47)
    ├── Difficulty Walking (Gait Abnormality)
    ├── Difficulty Standing for Long Time (Postural Intolerance)
    └── ... (45 more)
```

**Deduplication Strategy**:
- Check for overlapping symptoms between basic and advanced lists
- Merge similar symptoms (e.g., "Rotator Cuff Syndrome" vs "Rotator Cuff Pain")
- Keep most specific/clinically accurate version
- Maintain unique IDs for each symptom

### 4. Bayesian Diagnosis Engine Enhancement

**Current Implementation**:
- Calculates posterior probability for each condition
- Uses Bayes' theorem: P(Condition|Symptoms) ∝ P(Symptoms|Condition) × P(Condition)
- Returns top results sorted by probability

**Required Updates**:
- Add likelihoods for new symptoms to existing conditions
- Add new conditions if needed for advanced symptoms
- Verify mathematical soundness of calculations
- Test edge cases (single symptom, no symptoms, rare combinations)

**Likelihood Mapping**:
- For each new symptom, determine which conditions it's associated with
- Assign likelihood values (0.0 - 1.0) based on clinical prevalence
- Ensure likelihoods are clinically defensible

### 5. Self-Care Tips Expansion

**Current Structure**:
```typescript
export const selfCareTips: Record<string, SelfCareTip[]> = {
  lower_back_pain: [
    { icon: '🧊', tip: '...' },
    // ...
  ],
  // ...
}
```

**Expansion Requirements**:
- Add tips for all 47 new symptoms
- Tips must be evidence-based (RICE, heat therapy, stretching, etc.)
- Include safety warnings where appropriate
- Format: emoji + actionable tip (keep existing format)

**Tip Categories**:
- Immediate relief (ice, heat, rest)
- Movement/exercise (gentle stretching, strengthening)
- Ergonomic adjustments
- When to seek professional help
- Lifestyle modifications

## Data Flow

```
User Input (Symptoms Selected)
    ↓
Symptom Checker Component
    ↓
runBayesianDiagnosis(selectedSymptomIds)
    ↓
Bayesian Engine
  - Lookup likelihoods for each symptom
  - Calculate posterior probabilities
  - Sort by probability
    ↓
DiagnosisResult[] (sorted by probability)
    ↓
Display Results + Self-Care Tips
```

## UI/UX Specifications

### About Us Page
- **Team Card Width**: Full container width (responsive)
- **Image Size**: 180x180px
- **Spacing**: 1.5rem gap between cards
- **Hover Effect**: Subtle background color change, slight translateX
- **Mobile Breakpoint**: < 768px (stack vertically)

### Symptom Checker
- **Search Bar Height**: 44px (touch-friendly)
- **Symptom Buttons**: 0.82rem font, 0.4rem 0.9rem padding
- **Scrollable Containers**: maxHeight 280px
- **Results Display**: Probability bars with color coding
- **Disclaimer**: Prominent warning about consulting professionals

## Testing Strategy

### Unit Tests
- Bayesian calculation accuracy
- Symptom deduplication logic
- Self-care tip retrieval

### Integration Tests
- Search functionality with expanded symptom list
- Diagnosis results with various symptom combinations
- UI responsiveness on different screen sizes

### Manual Testing
- Verify no duplicate symptoms
- Test edge cases (single symptom, rare combinations)
- Validate clinical accuracy of results
- Check self-care tips are appropriate

## Performance Considerations

- Symptom list size: 69 items (minimal performance impact)
- Bayesian calculation: O(n*m) where n=symptoms, m=conditions (acceptable)
- Search filtering: O(n) with string matching (acceptable)
- No pagination needed for symptom list (fits in scrollable container)

## Accessibility

- Search input has clear label/placeholder
- Symptom buttons are keyboard accessible
- Color contrast meets WCAG standards
- Hover states are visible and clear
- Scrollable containers have visible scrollbars
