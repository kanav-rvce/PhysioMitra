# PhysioMitra UI Expansion & Symptom Database - Implementation Tasks

## Task List

### Phase 1: Symptom Database Expansion

- [ ] 1.1 Expand physiotherapy symptoms list with 47 new clinical symptoms
  - [ ] 1.1.1 Add all 47 advanced/clinical symptoms to symptomData.ts
  - [ ] 1.1.2 Verify no duplicate symptoms exist
  - [ ] 1.1.3 Ensure all symptoms have unique IDs and clinical terminology

- [ ] 1.2 Add self-care tips for all new symptoms
  - [ ] 1.2.1 Create self-care tips for 47 new symptoms
  - [ ] 1.2.2 Verify tips are evidence-based and medically accurate
  - [ ] 1.2.3 Include safety warnings where appropriate

- [ ] 1.3 Update Bayesian diagnosis engine
  - [ ] 1.3.1 Add likelihoods for new symptoms to existing conditions
  - [ ] 1.3.2 Verify mathematical soundness of calculations
  - [ ] 1.3.3 Test with various symptom combinations

### Phase 2: UI Updates

- [ ] 2.1 Redesign About Us page layout
  - [ ] 2.1.1 Change team cards to horizontal side-by-side layout
  - [ ] 2.1.2 Increase image size to 180x180px
  - [ ] 2.1.3 Remove role badges from team cards
  - [ ] 2.1.4 Maintain hover effects and scrollable container
  - [ ] 2.1.5 Test responsive design on mobile

- [ ] 2.2 Simplify Symptom Checker search bar
  - [ ] 2.2.1 Update search placeholder to "Search For Symptoms"
  - [ ] 2.2.2 Remove any "record" or secondary options
  - [ ] 2.2.3 Verify search functionality works with expanded symptom list
  - [ ] 2.2.4 Test clear button functionality

### Phase 3: Testing & Validation

- [ ] 3.1 Test Bayesian diagnosis engine
  - [ ] 3.1.1 Test with single symptom
  - [ ] 3.1.2 Test with multiple symptoms
  - [ ] 3.1.3 Test with rare symptom combinations
  - [ ] 3.1.4 Verify results are clinically reasonable

- [ ] 3.2 Validate symptom database
  - [ ] 3.2.1 Verify all 69 symptoms are present
  - [ ] 3.2.2 Verify no duplicates exist
  - [ ] 3.2.3 Verify all symptoms have clinical terminology
  - [ ] 3.2.4 Verify all symptoms have self-care tips

- [ ] 3.3 Test UI changes
  - [ ] 3.3.1 Test About Us page on desktop
  - [ ] 3.3.2 Test About Us page on mobile
  - [ ] 3.3.3 Test search functionality
  - [ ] 3.3.4 Test symptom selection and analysis

### Phase 4: Documentation & Deployment

- [ ] 4.1 Update documentation
  - [ ] 4.1.1 Document new symptoms and clinical terminology
  - [ ] 4.1.2 Document Bayesian engine updates
  - [ ] 4.1.3 Update README with new features

- [ ] 4.2 Final validation
  - [ ] 4.2.1 Run full test suite
  - [ ] 4.2.2 Verify no build errors
  - [ ] 4.2.3 Verify no console warnings
  - [ ] 4.2.4 Deploy to production

## Estimated Effort

- Phase 1: 2-3 hours (database expansion)
- Phase 2: 1-2 hours (UI updates)
- Phase 3: 1-2 hours (testing)
- Phase 4: 30 minutes (documentation)

**Total: 5-8 hours**

## Dependencies

- None (all changes are additive)

## Risks

- Bayesian calculations may need tuning for new symptoms
- Self-care tips must be medically accurate
- UI changes must maintain responsiveness

## Success Criteria

- All 69 physiotherapy symptoms are in database
- No duplicate symptoms
- Bayesian engine produces clinically reasonable results
- About Us page displays team side-by-side with larger images
- Search bar is clean and focused
- All tests pass
- No build errors or warnings
