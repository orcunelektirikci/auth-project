describe('import vue components', () => {
  it('works as intended', async () => {
    const component = await import('../components/navigation/Header/MobileResponsiveBar.vue')
    expect(component).toBeDefined()
  })
})
